import { UnifiedWalletProviderProps } from "@solana-wallets/unified";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["unified-wallet-button"]: UnifiedWalletProviderProps;
    }
  }
}
