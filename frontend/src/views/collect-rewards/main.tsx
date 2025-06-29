import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { WIP_TOKEN_ADDRESS } from "@story-protocol/core-sdk";
import { useStory } from "../../context/AppContext";
import { getUserGroupId } from "../upload-now/main";
import axiosBackend from "../../services/axios.config.services";
import { DatasetInfo } from "../../types/dataset.type";
import { FaSpinner } from "react-icons/fa";
import { ethers } from "ethers";
type Props = {
  groupId: `0x${string}`;
  wipTokenAddress: `0x${string}`;
  memberIpId: `0x${string}`;
  client: any;
};

const RoyaltiesPage = () => {
  const [status, setStatus] = useState("");
  const [royalties, setRoyalties] = useState<null | string>(null);
  const [rewards, setRewards] = useState<null | string>(null);
  const [claimed, setClaimed] = useState<null | string>(null);
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  const { data: wallet } = useWalletClient();
  const { txLoading, txHash, txName, client } = useStory();
  const [groupId, setGroupId] = useState<`0x${string}` | null>();

  const getUserGroupDatasetIps = async () => {
    try {
      if (!wallet || !wallet.account) {
        setStatus("❌ Please connect your wallet first.");
        return [];
      }
      setStatus("⏳ Fetching datasets...");
      const userAddress = wallet?.account?.address || "";
      const response = await axiosBackend.get(`/api/dataset/${userAddress}`);
      const datasets = response.data;
      console.log("Fetched datasets:", datasets);
      setDatasets(datasets);
      //  /api/dataset/:address
      setStatus("✅ Datasets fetched successfully.");
    } catch (error) {
      console.error("Error fetching datasets:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!wallet || !wallet.account) {
      setStatus("❌ Please connect your wallet first.");
      return;
    }
    setStatus("⏳ Fetching group ID...");
    const userAddress = wallet?.account?.address || "";
    getUserGroupDatasetIps();
    getUserGroupId(userAddress)
      .then((id) => {
        console.log("Group ID:", id);
        setGroupId(id as `0x${string}`);
        setStatus("✅ Group ID fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching group ID:", error);
        setStatus("❌ Error fetching group ID. Please try again later.");
      });
  }, [wallet]);

  const formatEth = (amount: string | number | bigint) => {
    return parseFloat(amount.toString()) / 1e18;
  };

  const handleCollectAndClaim = async () => {
    try {
      setIsClaimingRewards(true);
      setRewards(null);
      setRoyalties(null);
      if (!wallet) {
        setStatus("❌ Please connect your wallet first.");
        return;
      }

      if (!client) {
        setStatus("❌ Client not initialized. Please try again later.");
        return;
      }

      if (!groupId) {
        setStatus("❌ Group ID not found. Please try again later.");
        return;
      }

      if (datasets.length == 0) {
        setStatus("❌ No datasets found. Please upload a dataset first.");
        return;
      }

      try {
        setStatus("⏳ Collecting royalties...");
        await client.groupClient.collectRoyalties({
          groupIpId: groupId!,
          currencyToken: WIP_TOKEN_ADDRESS,
        });
        setRoyalties("Royalties collected successfully.");
        setStatus("⏳ Checking claimable rewards...");
      } catch (_) {}

      const memberIpIds: `0x${string}`[] = [];

      for (const dataset of datasets) {
        const ipId = dataset.ipId as `0x${string}`;
        const vault = await client.royalty.getRoyaltyVaultAddress(ipId);
        if (vault && vault.toLowerCase() !== ethers.ZeroAddress) {
          memberIpIds.push(ipId);
        }
      }

      console.log("Member IP IDs:", memberIpIds);

      const rewardInfo = await client.groupClient.getClaimableReward({
        groupIpId: groupId!,
        currencyToken: WIP_TOKEN_ADDRESS,
        memberIpIds,
      });

      console.log("Reward Info:", rewardInfo);

      const totalRewards = rewardInfo.reduce(
        (acc: bigint, curr: bigint) => acc + BigInt(curr),
        BigInt(0)
      );

      if (totalRewards === BigInt(0)) {
        setRewards("No claimable rewards found.");
        setStatus("✅ No claimable rewards found.");
        setClaimed(null);
        setIsClaimingRewards(false);
        return;
      }

      setRewards(`Total Claimable Rewards: ${formatEth(totalRewards)} WIP`);
      setStatus("✅ Claimable rewards fetched");

      setStatus("⏳ Claiming rewards...");
      const claimResponse = await client.groupClient.claimReward({
        groupIpId: groupId!,
        currencyToken: WIP_TOKEN_ADDRESS,
        memberIpIds,
      });

      console.log("Claim Response:", claimResponse);

      setClaimed("Rewards claimed successfully.");
      setStatus("🎉 Rewards claimed");
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ Error: ${error.message || "Unknown error"}`);
    } finally {
      setIsClaimingRewards(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        🎁 Royalties & Rewards
      </h1>

      {isClaimingRewards ? (
        <div className="w-full flex justify-center items-center py-3 rounded-xl bg-blue-600">
          <FaSpinner className="animate-spin text-white text-2xl" />
        </div>
      ) : (
        <button
          onClick={handleCollectAndClaim}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Collect & Claim
        </button>
      )}

      <div className="text-center text-sm text-gray-500">{status}</div>

      {royalties && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-700">📥 Royalties</h2>
          <p className="text-gray-600 mt-1">{royalties}</p>
        </div>
      )}

      {rewards && (
        <div className="bg-yellow-100 p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-yellow-800">
            💰 Claimable Rewards
          </h2>
          <p className="text-yellow-700 mt-1">{rewards}</p>
        </div>
      )}

      {claimed && (
        <div className="bg-green-100 p-4 rounded-xl">
          <h2 className="text-lg font-semibold text-green-800">✅ Claimed</h2>
          <p className="text-green-700 mt-1">{claimed}</p>
        </div>
      )}

      {datasets.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            📦 Your Datasets
          </h2>
          {datasets.map((dataset) => (
            <div
              key={dataset.cid}
              className="bg-white border rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition"
            >
              <img
                src={dataset.preview}
                alt={dataset.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-md font-bold text-gray-800">
                  {dataset.name}
                </h3>

                <div className="text-xs text-gray-400 mt-1">
                  Group ID: {dataset.groupId.slice(0, 6)}...
                  {dataset.groupId.slice(-4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoyaltiesPage;
