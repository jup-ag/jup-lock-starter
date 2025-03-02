import { createFileRoute } from "@tanstack/react-router";
import { useWallet } from "@solana-wallets/react-2.0";

import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { CreateForm } from "../components/CreateForm";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { connectedAccount } = useWallet();
  console.log({ connectedAccount });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col text-center h-full gap-y-6 py-12 px-2.5">
        <header className="text-4xl font-medium">Create Lock</header>
        <div className="flex w-full items-center justify-center">
          <ConnectWalletButton />
        </div>
        <CreateForm />
      </div>
    </div>
  );
}
