// script copied from https://solana.stackexchange.com/a/17497
import { createFromRoot } from "codama";
import { type AnchorIdl, rootNodeFromAnchor } from "@codama/nodes-from-anchor";
import { renderJavaScriptVisitor } from "@codama/renderers";
import path from "node:path";

import idl from "./idl.json";

// Instantiate Codama.
const codama = createFromRoot(rootNodeFromAnchor(idl as AnchorIdl));

const JS_OUTPUT_FOLDER_PATH = "./src/program";
// Render JavaScript.
const generatedPath = path.join(JS_OUTPUT_FOLDER_PATH);
codama.accept(renderJavaScriptVisitor(generatedPath));

console.log("Successfully generated ts files at: ", generatedPath);
