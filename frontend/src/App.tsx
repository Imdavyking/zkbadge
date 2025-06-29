import "./App.css";
import "./utils/polyfill"; 
import "@tomo-inc/tomo-evm-kit/styles.css";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavHeader from "./components/NavHeader";
import { getDefaultConfig, TomoEVMKitProvider } from "@tomo-inc/tomo-evm-kit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TOMO_CLIENT_ID, WALLET_CONNECT_PROJECT_ID } from "./utils/constants";
import { storyAeneid } from "wagmi/chains";
import AppProvider from "./context/AppContext";

const config = getDefaultConfig({
  clientId: TOMO_CLIENT_ID,
  appName: "OpenRoots",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [storyAeneid],
  ssr: true,
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TomoEVMKitProvider>
          <ToastContainer />
          <AppProvider>
            <BrowserRouter>
              <NavHeader />
              <Router />
            </BrowserRouter>
          </AppProvider>
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
