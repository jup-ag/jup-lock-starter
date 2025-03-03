import {
  createDefaultRpcTransport,
  createSolanaRpcFromTransport,
  mainnet,
  getComputeUnitEstimateForTransactionMessageFactory,
  type IInstruction,
  pipe,
  createTransactionMessage,
  getBase58Decoder,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  type TransactionSigner,
  appendTransactionMessageInstructions,
  prependTransactionMessageInstruction,
  signAndSendTransactionMessageWithSigners,
} from "@solana/web3.js";
import { getSetComputeUnitLimitInstruction } from "@solana-program/compute-budget";

const HTTP_API_URL = "https://solana-rpc.publicnode.com";
// Create an HTTP transport or any custom transport of your choice.
const transport = createDefaultRpcTransport({
  url: mainnet(HTTP_API_URL),
});
// Create an RPC client using that transport.
export const rpc = createSolanaRpcFromTransport(transport);

// const WS_API_URL =
//   "wss://solana-rpc.publicnode.com";
// export const rpcSubscriptions = createSolanaRpcSubscriptions(
//   mainnet(WS_API_URL),
// );

// Create an estimator function.
const getComputeUnitEstimateForTransactionMessage =
  getComputeUnitEstimateForTransactionMessageFactory({
    rpc,
  });

export async function signAndSendTransactions({
  signer,
  instructions,
  estimateCompute,
}: {
  signer: TransactionSigner;
  instructions: IInstruction[];
  estimateCompute?: boolean | undefined;
}): Promise<string> {
  // Setup message  with signer, block hash, instructions
  const recentBlockhashRes = await rpc.getLatestBlockhash().send();
  const recentBlockhash = recentBlockhashRes.value;
  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayerSigner(signer, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(recentBlockhash, m),
    (m) => appendTransactionMessageInstructions(instructions, m),
  );

  if (!estimateCompute) {
    const res = await signAndSendTransactionMessageWithSigners(message);
    const base58Signature = getBase58Decoder().decode(res);
    return base58Signature;
  }

  // Request an estimate of the actual compute units this message will consume.
  const computeUnitsEstimate =
    await getComputeUnitEstimateForTransactionMessage(message);
  // Set the transaction message's compute unit budget.
  const messageWithComputeUnitLimit = prependTransactionMessageInstruction(
    getSetComputeUnitLimitInstruction({ units: computeUnitsEstimate }),
    message,
  );
  const res = await signAndSendTransactionMessageWithSigners(
    messageWithComputeUnitLimit,
  );
  const base58Signature = getBase58Decoder().decode(res);
  return base58Signature;
}
