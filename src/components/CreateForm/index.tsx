import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useWallet } from "@solana-wallets/react-2.0";
import { useMemo } from "react";

import { Input } from "../Input";
import { createLock, LockSchema } from "../../program/createLock";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form";
import { Button } from "../Button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";
import {
  CancelMode,
  ModeLabel,
  UpdateRecipientMode,
} from "../../program/modes";

export const CreateForm: React.FC = () => {
  const { getTransactionSendingSigner, connectedAccount } = useWallet();
  const signer = useMemo(
    () => getTransactionSendingSigner(),
    [connectedAccount],
  );
  const form = useForm<LockSchema>({
    // @ts-expect-error: valibot transforms arent typed properly yet. TODO: update hookform/resolvers package when fix ships https://github.com/react-hook-form/resolvers/issues/743
    resolver: valibotResolver(LockSchema),
    defaultValues: {
      updateRecipientMode: UpdateRecipientMode.CREATOR_ONLY,
      cancelMode: CancelMode.CREATOR_ONLY,
    },
  });
  async function onSubmit(values: LockSchema) {
    if (!signer) {
      return;
    }
    const res = await createLock({
      signer,
      form: values,
      decimals: 9,
      version: "spl",
    });

    console.log("create lock res: ", { res });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7.5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Lock no. 420" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lock Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="69420"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lock Token Address</FormLabel>
              <FormControl>
                <Input placeholder="So11111..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Address</FormLabel>
              <FormControl>
                <Input placeholder="A5ehf..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vesting Start Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vesting Duration (in minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="10080 (1 week in mins)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cliff.duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliff Duration (in minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="10080 (1 week in mins)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cliff.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliff Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="4269"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unlockRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unlock Rate (in mins)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cancelMode"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Who Can Update Recipient?</FormLabel>
              <Select>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={ModeLabel["creator"]} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent sideOffset={18}>
                  {Object.values(CancelMode).map((mode) => (
                    <SelectItem value={mode}>{ModeLabel[mode]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="updateRecipientMode"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Who Can Update Recipient?</FormLabel>
              <Select>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={ModeLabel["creator"]} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent sideOffset={18}>
                  {Object.values(UpdateRecipientMode).map((mode) => (
                    <SelectItem value={mode}>{ModeLabel[mode]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create lock</Button>
      </form>
    </Form>
  );
};
