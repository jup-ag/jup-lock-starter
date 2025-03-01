import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { WalletProvider } from "@solana-wallets/react-2.0";

export const Route = createRootRoute({
  component: () => (
    <WalletProvider
      autoConnect={true}
      localStorageKey="unified:wallet-storage-key"
      disconnectOnAccountChange={true}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </WalletProvider>
  ),
});
