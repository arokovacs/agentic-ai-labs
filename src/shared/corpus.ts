/**
 * Charge la base de connaissances fictive depuis `data/corpus/*.md`, la découpe
 * en chunks, et renvoie des `Document` LangChain prêts à être embeddés.
 *
 * Pourquoi découper ici (et pas dans le retriever) : le chunking est une propriété
 * du *corpus*, pas d'une stratégie de récupération particulière. Le garder ici fait
 * que le retriever du Lab 2, le graphe du Lab 4 et l'agent du Lab 6 consomment des
 * documents découpés à l'identique (DRY, responsabilité unique).
 */
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const HERE = dirname(fileURLToPath(import.meta.url));
const CORPUS_DIR = join(HERE, "..", "..", "data", "corpus");

const SPLITTER = new RecursiveCharacterTextSplitter({
  chunkSize: 700,
  chunkOverlap: 100,
});

/**
 * Lit chaque markdown du corpus, tague chaque chunk avec son fichier source, et
 * renvoie la liste aplatie des chunks.
 */
export async function loadCorpus(): Promise<Document[]> {
  const files = (await readdir(CORPUS_DIR)).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    throw new Error(`No corpus files found in ${CORPUS_DIR}`);
  }

  const perFileChunks = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(join(CORPUS_DIR, file), "utf8");
      const chunks = await SPLITTER.splitText(raw);
      // Chaque chunk porte sa source pour la citation (cf. RagService).
      return chunks.map(
        (pageContent) => new Document({ pageContent, metadata: { source: file } }),
      );
    }),
  );

  return perFileChunks.flat();
}
