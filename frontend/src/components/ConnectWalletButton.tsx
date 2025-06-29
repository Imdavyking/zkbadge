import { ellipsify } from "../utils/ellipsify";

export default function ConnectWalletButton() {
  const { address, isConnected, openAccountModal, openConnectModal } = {
    address: "0x1234567890abcdef1234567890abcdef12345678", // Replace with actual address from context
    isConnected: true, // Replace with actual connection state from context
    openAccountModal: () => console.log("Open account modal"), // Replace with actual function from context
    openConnectModal: () => console.log("Open connect modal"), // Replace with actual function from context
  };
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
