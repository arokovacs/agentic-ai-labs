/**
 * Petit logger structuré. Volontairement minimal — sans dépendance, sans cérémonie
 * (KISS / YAGNI). Dans un vrai produit ce serait pino ou le logger OTel, mais pour
 * un atelier un wrapper console typé garde un bon rapport signal/bruit.
 *
 * 💡 Pour la prod, remplacer par `pino` (https://github.com/pinojs/pino) :
 *    rapide, logs JSON structurés, rédaction intégrée.
 */
type Level = "info" | "warn" | "error" | "step";

const ICON: Record<Level, string> = {
  info: "·",
  warn: "⚠",
  error: "✖",
  step: "→",
};

function emit(level: Level, msg: string, meta?: unknown): void {
  const line = `${ICON[level]} ${msg}`;
  const sink = level === "error" ? console.error : console.log;
  if (meta === undefined) sink(line);
  else sink(line, meta);
}

export const log = {
  info: (msg: string, meta?: unknown) => emit("info", msg, meta),
  warn: (msg: string, meta?: unknown) => emit("warn", msg, meta),
  error: (msg: string, meta?: unknown) => emit("error", msg, meta),
  /** Met en évidence une étape d'un run en code-along pour que le public suive. */
  step: (msg: string, meta?: unknown) => emit("step", msg, meta),
  /** Séparateur visuel imprimé entre les phases d'un lab. */
  banner: (title: string) =>
    console.log(`\n${"─".repeat(4)} ${title} ${"─".repeat(Math.max(0, 60 - title.length))}`),
};
