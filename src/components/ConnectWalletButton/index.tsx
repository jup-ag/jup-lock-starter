import { useWallet } from "@solana-wallets/react-2.0";
import { useEffect, useMemo, useState, type ComponentProps } from "react";

import { Button } from "../Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Dialog";
import { cn } from "../../styles/cn";
import { TruncatedAddress } from "../TruncatedAddress";

export const ConnectWalletButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { connectedAccount } = useWallet();

  // Close dialog on wallet connect success
  useEffect(() => {
    if (connectedAccount) {
      setOpen(false);
    }
  }, [connectedAccount]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ConnectWalletTrigger setOpen={setOpen} />
      <DialogContent className="flex flex-col gap-y-7.5">
        <DialogHeader>
          <DialogTitle>Select Wallet</DialogTitle>
        </DialogHeader>
        <ConnectWalletList />
      </DialogContent>
    </Dialog>
  );
};

type ConnectWalletTriggerProps = Omit<ComponentProps<"button">, "onClick"> & {
  setOpen: (open: boolean) => void;
};
const ConnectWalletTrigger: React.FC<ConnectWalletTriggerProps> = ({
  className,
  setOpen,
  ...props
}) => {
  const { connectedAccount, connecting, disconnect } = useWallet();
  const address = useMemo<string | undefined>(() => {
    if (!connectedAccount) {
      return;
    }
    return connectedAccount.type === "mwa" ||
      connectedAccount.type === "standard"
      ? connectedAccount.info?.pubKey
      : connectedAccount.info.publicKey;
  }, [connectedAccount]);

  function handleClick() {
    // Cancel if already connecting
    if (connecting) {
      return;
    }
    // Disconnect if already connected
    if (address) {
      disconnect();
      return;
    }
    // Select wallet to connect to
    setOpen(true);
  }

  return (
    <Button
      className={cn("text-2xl font-medium px-2.5", className)}
      onClick={handleClick}
      disabled={connecting}
      {...props}
    >
      {connecting ? (
        "Connecting..."
      ) : address ? (
        <div className="flex items-center gap-x-2.5">
          <img src={connectedAccount?.info?.icon} height={20} width={20} />
          <TruncatedAddress className="text-lg" address={address} />
        </div>
      ) : (
        "Connect"
      )}
    </Button>
  );
};

const ConnectWalletList: React.FC = () => {
  const { wallets, connect } = useWallet();
  return (
    <div className="flex flex-col gap-y-6">
      {wallets.map((wallet) => (
        <Button
          className="w-full flex items-center gap-x-2.5"
          onClick={() => connect({ wallet: wallet.wallet.name })}
        >
          <img src={wallet.wallet.icon} height={20} width={20} />
          <span>{wallet.wallet.name}</span>
        </Button>
      ))}
    </div>
  );
};
