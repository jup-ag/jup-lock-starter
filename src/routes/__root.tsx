import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { WalletProvider } from "@solana-wallets/react-2.0";
import type {
  UnifiedWalletButtonProps,
  UnifiedWalletProviderProps,
} from "@solana-wallets/unified";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "unified-wallet-modal": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        UnifiedWalletProviderProps;
    }
    interface IntrinsicElements {
      "unified-wallet-modal-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        UnifiedWalletButtonProps;
    }
  }
}

export const Route = createRootRoute({
  component: () => (
    <WalletProvider
      autoConnect={true}
      localStorageKey="unified:wallet-storage-key"
      disconnectOnAccountChange={true}
    >
      <unified-wallet-modal />
      <Outlet />
      <TanStackRouterDevtools />
    </WalletProvider>
  ),
});
