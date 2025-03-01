import type { UnifiedWalletProviderProps } from "@solana-wallets/unified";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "unified-wallet-button": UnifiedWalletProviderProps;
    }
  }
}
const ClientOnlyConnectWalletButton = clientOnly(async () => ({
  default: () => {
    onMount(async () => {
      const { loadCustomElements } = await import("@solana-wallets/unified");
      loadCustomElements();
    });
    return (
      <unified-wallet-modal-button
        button-class-name="bg-red-300 p-3"
        // current-user-class-name="bg-blue-300 p-3"
      />
    );
  },
}));
