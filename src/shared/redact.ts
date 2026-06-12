/**
 * Rédaction de PII — à appeler sur TOUT texte libre avant qu'il ne quitte le
 * processus vers une trace, un log ou un dataset d'éval. RGPD : les données
 * personnelles ne doivent pas atterrir non rédigées dans un backend
 * d'observabilité, même hébergé en UE.
 *
 * Volontairement conservateur et basé sur des motifs (emails, numéros type carte,
 * téléphones FR, IBAN). C'est une couche de *défense en profondeur*, pas un
 * substitut au fait de ne pas collecter de PII (minimisation des données).
 *
 * 💡 Pour une détection plus riche (noms, adresses, basée NER), envisager
 *    Microsoft Presidio (https://github.com/microsoft/presidio) derrière cette même frontière.
 */
const PATTERNS: ReadonlyArray<{ label: string; re: RegExp }> = [
  { label: "[email]", re: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { label: "[iban]", re: /\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]{2,4}){2,8}\b/g },
  { label: "[card]", re: /\b(?:\d[ -]?){13,16}\b/g },
  { label: "[phone]", re: /(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}/g },
];

/** Renvoie `text` avec la PII reconnue remplacée par des marqueurs typés. */
export function redactPII(text: string): string {
  if (!text) return text;
  return PATTERNS.reduce((acc, { label, re }) => acc.replace(re, label), text);
}

/** Rédige chaque valeur chaîne d'un objet metadata peu profond (pour les metadata de trace). */
export function redactMetadata(
  meta: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    out[key] = typeof value === "string" ? redactPII(value) : value;
  }
  return out;
}
