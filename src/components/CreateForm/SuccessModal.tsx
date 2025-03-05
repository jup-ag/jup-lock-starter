import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/Dialog";
import { TruncatedAddress } from "~/components/TruncatedAddress";
import { ExternalLink } from "../ExternalLink";

type SuccessModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  txHash: string;
};

export const SuccessModal: React.FC<SuccessModalProps> = ({
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
            <ExternalLink
              className="hover:underline"
              href={`https://solscan.io/tx/${txHash}`}
            >
              View tx <TruncatedAddress className="italic" address={txHash} />{" "}
              here
            </ExternalLink>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
