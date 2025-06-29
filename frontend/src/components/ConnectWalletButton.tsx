import { ellipsify } from "../utils/ellipsify";
import { useWalletStore } from "../context/wallet-context";

export default function ConnectWalletButton() {
  const store = useWalletStore();

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={
          store.hasConnectedWallet
            ? () => {
                store.disconnect();
              }
            : () => {
                store.connectWallet("mnLace");
              }
        }
        className={`cursor-pointer px-6 py-2 ${
          store.address
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50`}
      >
        {!store.hasConnectedWallet
          ? "Connect Wallet"
          : store.address
          ? `Disconnect (${ellipsify(store.address)})`
          : "Connecting..."}
      </button>
    </div>
  );
}
