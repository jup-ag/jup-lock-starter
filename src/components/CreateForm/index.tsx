import { useWallet } from "@solana-wallets/react-2.0";
import { useMemo, useState } from "react";
import { parse } from "valibot";
import { useForm } from "@tanstack/react-form";

import { useBalances } from "~/rpc/useBalances";
import {
  createLock,
  LockSchema,
  type InputLockSchema,
} from "~/lock/createLock";
import { ConnectWalletButton } from "~/components/ConnectWalletButton";
import { Field } from "./Field";
import { cn } from "~/styles/cn";
import { Input } from "~/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/Select";
import { TruncatedAddress } from "~/components/TruncatedAddress";
import { CancelMode, ModeLabel, UpdateRecipientMode } from "~/lock/modes";
import { Button } from "~/components/Button";
import { SuccessModal } from "./SuccessModal";

export const CreateForm: React.FC = () => {
  const { getTransactionSendingSigner, connectedAccount } = useWallet();
  const signer = useMemo(
    () => getTransactionSendingSigner(),
    [connectedAccount],
  );
  const { data: balances } = useBalances(signer?.address.toString());

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>();
  const form = useForm({
    defaultValues: {
      title: undefined,
      tokenAddress: undefined,
      tokenAmount: undefined,
      unlockRate: undefined,
      recipient: undefined,
      startDate: undefined,
      duration: undefined,
      updateRecipientMode: undefined,
      cancelMode: undefined,
    } as unknown as InputLockSchema,
    validators: {
      onMount: LockSchema,
      onSubmit: LockSchema,
    },
    onSubmit: async ({ value }) => {
      if (!signer) {
        return;
      }
      const transformed = parse(LockSchema, value);
      if (!balances) {
        console.error("Failed to create lock: missing token balances! ", {
          balances,
        });
        return;
      }
      const decimals = balances[value.tokenAddress].decimals;
      if (decimals == null) {
        console.error(
          "Failed to create lock: missing decimals for token ",
          value.tokenAddress,
        );
        return;
      }
      const sig = await createLock({
        signer,
        form: transformed,
        version: "spl",
        decimals,
      });
      setTxHash(sig);
      setSuccessModalOpen(true);
    },
  });

  console.log("errors: ", form.state.errors[0]);

  return (
    <>
      <div className="space-y-7.5 w-full">
        <ConnectWalletButton />

        {connectedAccount && (
          <>
            <form.Field
              name="title"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    {field.name}
                  </span>
                  <Input
                    placeholder="Lock no. 420"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="tokenAddress"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Token
                  </span>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="w-full">
                      {field.state.value ? (
                        <TruncatedAddress
                          address={field.state.value}
                          charsStart={8}
                          charsEnd={8}
                        />
                      ) : (
                        "Select a token"
                      )}
                    </SelectTrigger>
                    {balances && (
                      <SelectContent sideOffset={18}>
                        {Object.entries(balances).map(([addr, info]) => (
                          <SelectItem key={addr} textValue={addr} value={addr}>
                            <div className="flex items-center gap-x-2.5 justify-between w-full">
                              <div>
                                <TruncatedAddress address={addr} />
                              </div>
                              <div className="text-right ml-auto">
                                {info.display.toFixed(2)}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="tokenAmount"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Lock amount
                  </span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="69420"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(
                        e.currentTarget.valueAsNumber.toString(),
                      );
                    }}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="recipient"
              validators={{
                onChange: LockSchema.entries.tokenAddress,
              }}
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Recipient Address
                  </span>
                  <Input
                    placeholder="Bdsf..."
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="startDate"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Start Date
                  </span>
                  <Input
                    type="datetime-local"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="duration"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Vesting Duration (in mins)
                  </span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="60"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(
                        e.currentTarget.valueAsNumber.toString(),
                      );
                    }}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="cliffDuration"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Cliff Duration (in mins)
                  </span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="60"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(
                        e.currentTarget.valueAsNumber.toString(),
                      );
                    }}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="cliffAmount"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Cliff Amount
                  </span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="420"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(
                        e.currentTarget.valueAsNumber.toString(),
                      );
                    }}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="unlockRate"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block capitalize", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Unlock Rate
                  </span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="42"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(
                        e.currentTarget.valueAsNumber.toString(),
                      );
                    }}
                  />
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="cancelMode"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Who can cancel the lock?
                  </span>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value as CancelMode);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      {field.state.value
                        ? ModeLabel[field.state.value]
                        : "Select cancel mode"}
                    </SelectTrigger>
                    <SelectContent sideOffset={18}>
                      {Object.values(CancelMode).map((mode) => (
                        <SelectItem
                          key={`cancel_${mode}`}
                          textValue={mode}
                          value={mode}
                        >
                          {ModeLabel[mode]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="updateRecipientMode"
              children={(field) => (
                <Field>
                  <span
                    className={cn("block", {
                      "text-red-500": field.state.meta.errors.length > 0,
                    })}
                  >
                    Who can update the recipient?
                  </span>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value as UpdateRecipientMode);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      {field.state.value
                        ? ModeLabel[field.state.value]
                        : "Select update mode"}
                    </SelectTrigger>
                    <SelectContent sideOffset={18}>
                      {Object.values(UpdateRecipientMode).map((mode) => (
                        <SelectItem
                          key={`update_${mode}`}
                          textValue={mode}
                          value={mode}
                        >
                          {ModeLabel[mode]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.map((err, i) => (
                    <p
                      key={i}
                      className={cn("text-[0.8rem] font-medium text-red-500")}
                    >
                      {err?.message}
                    </p>
                  ))}
                </Field>
              )}
            />

            <Button
              className="w-full mt-7.5 text-2xl py-1"
              disabled={form.state.errors.length > 0}
              onClick={form.handleSubmit}
            >
              {form.state.isSubmitting ? "Creating..." : "Create lock"}
            </Button>
          </>
        )}
      </div>

      {txHash && (
        <SuccessModal
          open={successModalOpen}
          setOpen={setSuccessModalOpen}
          name={form.state.values.title}
          txHash={txHash}
        />
      )}
    </>
  );
};
