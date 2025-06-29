import { storyAeneid } from "wagmi/chains";

export const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
export const RPC_URL = storyAeneid.rpcUrls.default.http[0];
export const CHAIN_ID = storyAeneid.id;
export const BLOCK_EXPLORER_URL = storyAeneid.blockExplorers.default.url;
export const CHAIN_NAME = storyAeneid.name;
export const CURRENCY_NAME = storyAeneid.nativeCurrency.name;
export const CHAIN_SYMBOL = storyAeneid.nativeCurrency.symbol;
export const DATASET_CONTRACT_ADDRESS = import.meta.env
  .VITE_DATASET_CONTRACT_ADDRESS;
export const LIT_PROTOCOL_IDENTIFIER = import.meta.env
  .VITE_LIT_PROTOCOL_IDENTIFIER;
export const ML_URL = import.meta.env.VITE_ML_URL;
export const WALLET_CONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLET_CONNECT_PROJECT_ID;
export const TOMO_CLIENT_ID = import.meta.env.VITE_TOMO_CLIENT_ID;
export const SPGNFTContractAddress =
  "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc";
export const LICENSE_TERMS_ID = 96; // Commercial Remix License

// defaultNFTContractAddress: '0x937bef10ba6fb941ed84b8d249abc76031429a9a' as Address,
// defaultSPGNFTContractAddress: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc' as Address,
