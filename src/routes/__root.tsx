import { createRootRoute, Outlet } from "@tanstack/react-router";
import { WalletProvider } from "@solana-wallets/react-2.0";

export const Route = createRootRoute({
  component: () => (
    <WalletProvider
      autoConnect={true}
      localStorageKey="unified:wallet-storage-key"
      disconnectOnAccountChange={true}
    >
      <main className="min-h-screen flex items-center justify-center py-18 px-2.5">
        <div className="text-center h-full space-y-12">
          <Outlet />
        </div>
      </main>
    </WalletProvider>
  ),
});
