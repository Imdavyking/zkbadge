"use client";
import "viem/window";
import { useEffect, useRef, useState } from "react";
import axios from "../../services/axios.config.services";
import { FaSpinner } from "react-icons/fa";
import { io } from "socket.io-client";
import {
  LICENSE_TERMS_ID,
  SERVER_URL,
  SPGNFTContractAddress,
} from "../../utils/constants";
import { toast } from "react-toastify";
import Papa from "papaparse";
import CSVPreview from "../csv-preview/main";
import { toPng } from "html-to-image";
import { useStory } from "../../context/AppContext";
import { ethers } from "ethers";
import { IpMetadata, LicensingConfigInput } from "@story-protocol/core-sdk";
import { useWalletClient } from "wagmi";
import { DatasetInfo } from "../../types/dataset.type";

export const getUserGroupId = async (
  userAddress: string
): Promise<string | null> => {
  try {
    const response = await axios.get(`/api/user-group?address=${userAddress}`);
    return response.data.groupId || null;
  } catch (err) {
    console.error("Error fetching Group IP:", err.message);
    return null;
  }
};

export default function UploadNow() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState("0");
  const [isUploading, setisUploading] = useState(false);
  const [csvPreviewRows, setCsvPreviewRows] = useState([]);
  const [csvImage, setCsvImage] = useState<string | null>(null);
  const [csvImageHash, setCsvImageHash] = useState<string | null>(null);
  const [creatorName, setCreatorName] = useState("");
  const imageRef = useRef(null);
  const { data: wallet } = useWalletClient();
  const { txLoading, txHash, txName, client } = useStory();

  enum Category {
    Finance = "0",
    Medicine = "1",
    Text = "2",
  }

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (!uploadedFile) return;

    if (uploadedFile.type !== "text/csv") {
      setError("Only CSV files are supported.");
      setFile(null);
      return;
    }

    setFile(uploadedFile);
    setError("");
    setSuccess("");
  };

  const previewImages = async () => {
    if (!file) return;
    const preview = await new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const allRows = results.data.filter(
            (row) => Object.keys(row as any).length > 0
          );
          const preview = [];

          for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * allRows.length);
            preview.push(allRows[randomIndex] as never);
          }

          resolve(preview);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
    setCsvPreviewRows(preview as any);
  };

  useEffect(() => {
    if (!file) return;

    previewImages();
  }, [file]);

  useEffect(() => {
    generateImage();
  }, [csvPreviewRows]);

  const saveUserGroupId = async (userAddress: string, groupId: string) => {
    try {
      await axios.post("/api/user-group", { address: userAddress, groupId });
    } catch (err) {
      console.error("Error saving Group IP:", err.message);
    }
  };
  const saveUserDataset = async (dataset: DatasetInfo) => {
    try {
      await axios.post("/api/dataset", dataset);
    } catch (err) {
      console.error("Error saving Group IP:", err.message);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    if (!creatorName.trim()) {
      toast.error("Please enter the creator's name.");
      return;
    }

    if (isUploading) {
      toast.error("Already uploading a file.");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);
    const socket = io(SERVER_URL);

    try {
      previewImages();
      setisUploading(true);
      setCsvPreviewRows([]);
      setError("");
      setSuccess("");

      const socketId = crypto.randomUUID().replaceAll("-", "");

      console.log(`Socket ID: ${socketId}`);

      socket.on(socketId, (data) => {
        console.log("Socket data received:", data);
        const { status, message } = data;

        toast.dismiss();
        toast[status]?.(message);
      });
      const queryParams = new URLSearchParams({
        socketId,
      });

      const response = await axios.post(
        `/api/upload-csv?socketId=${queryParams.toString()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setError("");

      const { ipfsUrl, csvHash } = response.data;

      if (typeof client === "undefined") {
        setError("❌ Client is not initialized. Please try again.");
        return;
      }

      const userAddress = wallet?.account?.address || "";

      const GROUP_POOL_ADDRESS = "0xf96f2c30b41Cb6e0290de43C8528ae83d4f33F89";
      let groupId = await getUserGroupId(userAddress);
      const licenseInfo = await client.license.getLicenseTerms(
        LICENSE_TERMS_ID
      );
      const licensingConfig: LicensingConfigInput = {
        isSet: true,
        disabled: false,
        expectGroupRewardPool: ethers.ZeroAddress as `0x${string}`,
        mintingFee: licenseInfo.terms.defaultMintingFee,
        licensingHook: ethers.ZeroAddress as `0x${string}`,
        hookData: ethers.ZeroAddress as `0x${string}`,
        commercialRevShare: 10,
        expectMinimumGroupRewardShare: 0,
      };

      if (!groupId) {
        const result = await client.groupClient.registerGroupAndAttachLicense({
          groupPool: GROUP_POOL_ADDRESS,
          licenseData: {
            licenseTermsId: LICENSE_TERMS_ID,
            licensingConfig,
          },
        });
        groupId = result.groupId!;
        await saveUserGroupId(userAddress, groupId);
      }

      const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
        title: file.name,
        description:
          typeof csvPreviewRows === "string"
            ? csvPreviewRows
            : JSON.stringify(csvPreviewRows),
        createdAt: `${Math.trunc(new Date().getTime() / 1000)}`,
        creators: [
          {
            name: creatorName,
            address: (wallet?.account?.address as `0x${string}`) || "",
            contributionPercent: 100,
          },
        ],
        image: csvImage!,
        imageHash: csvImageHash as `0x${string}`,
        mediaUrl: ipfsUrl,
        mediaHash: csvHash,
        mediaType: "text/csv",
      });
      const nftMetadata = {
        name: file.name,
        description:
          typeof csvPreviewRows === "string"
            ? csvPreviewRows
            : JSON.stringify(csvPreviewRows),
        image: csvImage!,
        attributes: [
          {
            key: "category",
            value:
              Object.keys(Category).find(
                (key) => Category[key as keyof typeof Category] === category
              ) || "Unknown",
          },
        ],
      };

      const [ipResponse, nftResponse] = await Promise.all([
        axios.post(
          `/api/upload-json?socketId=${queryParams.toString()}`,
          ipMetadata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        axios.post(
          `/api/upload-json?socketId=${queryParams.toString()}`,
          nftMetadata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
      ]);

      licensingConfig.expectGroupRewardPool = GROUP_POOL_ADDRESS;

      const mintIpResponse =
        await client.groupClient.mintAndRegisterIpAndAttachLicenseAndAddToGroup(
          {
            spgNftContract: SPGNFTContractAddress,
            groupId: groupId as `0x${string}`,
            licenseData: [
              {
                licenseTermsId: LICENSE_TERMS_ID,
                licensingConfig,
              },
            ],
            maxAllowedRewardShare: 100,
            ipMetadata: {
              ipMetadataURI: ipResponse.data.ipfsUrl,
              nftMetadataURI: nftResponse.data.ipfsUrl,
            },
          }
        );

      toast.success("✅ Dataset metadata uploaded successfully!");

      // save dataset info to database
      const datasetInfo: DatasetInfo = {
        creator: creatorName,
        address: (wallet?.account?.address as `0x${string}`) || "",
        cid: ipResponse.data.ipfsUrl.split("/").pop(),
        groupId: groupId,
        createdAt: Math.trunc(new Date().getTime() / 1000),
        category:
          Object.keys(Category).find(
            (key) => Category[key as keyof typeof Category] === category
          ) || "Unknown",
        name: file.name,
        description:
          typeof csvPreviewRows === "string"
            ? csvPreviewRows
            : JSON.stringify(csvPreviewRows),
        preview: csvImage!,
        ipId: mintIpResponse.ipId!,
      };

      await saveUserDataset(datasetInfo);

      toast.success("✅ Dataset uploaded successfully!");

      // const collectRoyaltiesResponse =
      //   await client.groupClient.collectRoyalties({
      //     groupIpId: groupId as `0x${string}`,
      //     currencyToken: WIP_TOKEN_ADDRESS,
      //   });

      // console.log("Royalties collected", collectRoyaltiesResponse);

      // const rewards = await client.groupClient.getClaimableReward({
      //   groupIpId: groupId as `0x${string}`,
      //   currencyToken: WIP_TOKEN_ADDRESS,
      //   memberIpIds: [mintIpResponse.ipId!],
      // });

      // console.log("Claimable rewards:", rewards);

      // const claimedRewards = await client.groupClient.claimReward({
      //   groupIpId: groupId as `0x${string}`,
      //   currencyToken: WIP_TOKEN_ADDRESS,
      //   memberIpIds: [mintIpResponse.ipId!],
      // });
      // console.log("Rewards claimed:", claimedRewards);
    } catch (err) {
      console.error(err.message);
      console.error("Stack trace:", err.stack);
      setError("❌ Upload failed.");
      setSuccess("");
    } finally {
      setisUploading(false);
      socket.close();
    }
  };

  async function sha256Hash(bytes: Uint8Array): Promise<string> {
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return `0x${hashHex}`;
  }

  function base64ToBytes(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  const generateImage = async () => {
    if (!imageRef.current) return;

    const dataUrl = await toPng(imageRef.current);

    const base64 = dataUrl.split(",")[1];
    const bytes = base64ToBytes(base64);

    const hashHex = await sha256Hash(bytes);

    setCsvImageHash(`0x${hashHex}`);
    setCsvImage(dataUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Upload your Dataset (CSV)
        </h2>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100 cursor-pointer"
        />

        <div className="mt-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Creator's Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter Creator's name"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-3 text-lg"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-3 text-lg"
          >
            {Object.entries(Category).map(([key, value]) => (
              <option key={value} value={value}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {file && (
          <div className="mt-4 text-green-600 text-sm">
            ✅ Uploaded: {file.name}
          </div>
        )}

        {error && <div className="mt-4 text-red-600 text-sm">⚠️ {error}</div>}
        {success && (
          <div className="mt-4 text-green-600 text-sm">{success}</div>
        )}

        <CSVPreview previewRows={csvPreviewRows} ref={imageRef} />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-semibold ${
            file
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isUploading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin  text-3xl" />
            </div>
          ) : (
            "Upload Now"
          )}
        </button>
      </div>
    </div>
  );
}
