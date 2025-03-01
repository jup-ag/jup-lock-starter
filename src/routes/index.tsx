import { createFileRoute } from "@tanstack/react-router";
import { useWallet } from "@solana-wallets/react-2.0";

import logo from "../logo.svg";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { connectedAccount } = useWallet();
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <div className="flex w-full items-center justify-center">
          <unified-wallet-button />
        </div>
        <Input placeholder="Enter lock title" />
        <Button>Create Lock</Button>
      </header>
    </div>
  );
}
