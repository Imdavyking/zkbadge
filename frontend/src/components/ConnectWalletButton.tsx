import { ellipsify } from "../utils/ellipsify";
import { useAccountModal, useConnectModal } from "@tomo-inc/tomo-evm-kit";
import { useAccount } from "wagmi";

export default function ConnectWalletButton() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={isConnected ? openAccountModal : openConnectModal}
        className={`cursor-pointer px-6 py-2 ${
          address
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50`}
      >
        {!isConnected
          ? "Connect Wallet"
          : address
          ? `Disconnect (${ellipsify(address)})`
          : "Connecting..."}
      </button>
    </div>
  );
}
