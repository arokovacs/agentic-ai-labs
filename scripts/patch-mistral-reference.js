/**
 * Postinstall patch — corrige deux bugs liés aux blocs « reference » dans
 * @mistralai/mistralai@1.15.x et @langchain/mistralai@0.2.x.
 *
 * 1. referencechunk.js  : reference_ids attendu en number mais envoyé en string.
 * 2. chat_models.js     : le convertisseur de messages jette sur les types
 *                         != "text"/"image_url", y compris "reference".
 *
 * Ce patch sera inutile quand @langchain/mistralai supportera @langchain/core@^1.0
 * (et donc @mistralai/mistralai@2.x qui corrige le problème nativement).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── Patch 1 : ReferenceChunk reference_ids accepts strings ──────────────────

function patchReferenceChunk() {
  const target = join(
    ROOT, "node_modules", "@mistralai", "mistralai",
    "models", "components", "referencechunk.js",
  );
  const PATCHED = "z.array(z.union([z.number().int(), z.string()]))";
  const NEEDLES = [
    "z.array(z.number().int())",
    "z.array(z.coerce.number().int())",
  ];
  try {
    let src = readFileSync(target, "utf8");
    if (src.includes(PATCHED)) {
      console.log("[patch-mistral] referencechunk.js already patched.");
      return;
    }
    let found = false;
    for (const needle of NEEDLES) {
      if (src.includes(needle)) { src = src.replaceAll(needle, PATCHED); found = true; }
    }
    if (!found) { console.log("[patch-mistral] referencechunk.js schema not recognised."); return; }
    writeFileSync(target, src, "utf8");
    console.log("[patch-mistral] referencechunk.js patched (reference_ids accepts strings).");
  } catch (err) { console.warn("[patch-mistral] referencechunk.js:", err.message); }
}

// ── Patch 2 : chat_models.js skips unknown content chunk types ──────────────

function patchChatModels() {
  const target = join(
    ROOT, "node_modules", "@langchain", "mistralai", "dist", "chat_models.js",
  );
  const NEEDLE = `throw new Error(\`Mistral only supports types "text" or "image_url" for complex message types.\`);`;
  const PATCH = `continue; // [patch-mistral] skip unknown content chunk types (e.g. "reference")`;
  try {
    let src = readFileSync(target, "utf8");
    if (src.includes(PATCH)) {
      console.log("[patch-mistral] chat_models.js already patched.");
      return;
    }
    if (!src.includes(NEEDLE)) {
      console.log("[patch-mistral] chat_models.js throw not found.");
      return;
    }
    // The throw is inside a forEach — we need to convert it to a for…of so
    // `continue` works. But simpler: just replace the throw with a `return`
    // (return inside forEach skips the current iteration, like continue).
    writeFileSync(target, src.replace(NEEDLE, `return; // [patch-mistral] skip unknown content chunk types (e.g. "reference")`), "utf8");
    console.log("[patch-mistral] chat_models.js patched (skip unknown chunk types).");
  } catch (err) { console.warn("[patch-mistral] chat_models.js:", err.message); }
}

patchReferenceChunk();
patchChatModels();
