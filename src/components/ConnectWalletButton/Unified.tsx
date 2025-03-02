import { loadCustomElements } from "@solana-wallets/unified";
import { useEffect, useLayoutEffect, useState } from "react";
// import "@solana-wallets/unified/index.css";

export const UnifiedConnectWalletButton: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    loadCustomElements();
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return <unified-wallet-button />;
};
