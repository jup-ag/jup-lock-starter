import { useWallet } from "@solana-wallets/react-2.0";
import { useCallback, useMemo, useState } from "react";
import { safeParse } from "valibot";

import { ConnectWalletButton } from "../../components/ConnectWalletButton";
import {
  createLock,
  LockSchema,
  type InputLockSchema,
} from "../../program/createLock";
import { Button } from "../Button/Button";
import { useBalances } from "../../rpc/useBalances";
import { UpdateRecipientModeField } from "./Fields/UpdateRecipientMode";
import { CancelModeField } from "./Fields/CancelMode";
import { UnlockRateField } from "./Fields/UnlockRate";
import { CliffAmountField } from "./Fields/CliffAmount";
import { CliffDurationField } from "./Fields/CliffDuration";
import { StartDateField } from "./Fields/StartDate";
import { DurationField } from "./Fields/Duration";
import { RecipientAddressField } from "./Fields/RecipientAddress";
import { TokenField } from "./Fields/Token";
import { TokenAmountField } from "./Fields/TokenAmount";
import { TitleField } from "./Fields/Title";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import { TruncatedAddress } from "../TruncatedAddress";

export const CreateForm: React.FC = () => {
  const { getTransactionSendingSigner, connectedAccount } = useWallet();
  const signer = useMemo(
    () => getTransactionSendingSigner(),
    [connectedAccount],
  );
  const { data: balances } = useBalances(signer?.address.toString());

  const [state, setState] = useState<Partial<InputLockSchema>>({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>();
  const onSubmit = useCallback(async () => {
    if (!signer || !state) {
      return;
    }
    const res = safeParse(LockSchema, state);
    if (!res.success) {
      return;
    }
    if (!balances) {
      console.error("Failed to create lock: missing token balances! ", {
        balances,
      });
      return;
    }
    const values = res.output;
    const decimals = balances[values.tokenAddress].decimals;
    if (decimals == null) {
      console.error(
        "Failed to create lock: missing decimals for token ",
        values.tokenAddress,
      );
      return;
    }
    const sig = await createLock({
      signer,
      form: values,
      version: "spl",
      decimals,
    });
    setTxHash(sig);
    setSuccessModalOpen(true);
  }, [state, signer]);

  return (
    <>
      <div className="space-y-7.5 w-full">
        <ConnectWalletButton />

        {connectedAccount && (
          <>
            <TitleField key={"title"} state={state} setState={setState} />
            <TokenField key={"token"} state={state} setState={setState} />
            <TokenAmountField
              key={"token_amount"}
              state={state}
              setState={setState}
            />
            <RecipientAddressField
              key={"recipient_address"}
              state={state}
              setState={setState}
            />
            <StartDateField
              key={"start_date"}
              state={state}
              setState={setState}
            />
            <DurationField key={"duration"} state={state} setState={setState} />
            <CliffDurationField
              key={"cliff_duration"}
              state={state}
              setState={setState}
            />
            <CliffAmountField
              key={"cliff_amount"}
              state={state}
              setState={setState}
            />
            <UnlockRateField
              key={"unlock_rate"}
              state={state}
              setState={setState}
            />
            <CancelModeField key={"cancel"} state={state} setState={setState} />
            <UpdateRecipientModeField
              key={"update_recipient"}
              state={state}
              setState={setState}
            />

            <Button className="w-full mt-2.5 text-2xl py-1" onClick={onSubmit}>
              Create lock
            </Button>
          </>
        )}
      </div>

      {state.title && txHash && (
        <SuccessModal
          open={successModalOpen}
          setOpen={setSuccessModalOpen}
          name={state.title}
          txHash={txHash}
        />
      )}
    </>
  );
};

type SuccessModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  txHash: string;
};
const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  setOpen,
  name,
  txHash,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="space-y-4.5">
          <DialogTitle>Created Lock: {name}!</DialogTitle>
          <DialogDescription>
            <a
              className="hover:underline"
              target="_blank"
              rel="noopener"
              href={`https://solscan.io/tx/${txHash}`}
            >
              View tx <TruncatedAddress className="italic" address={txHash} />{" "}
              here
            </a>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
