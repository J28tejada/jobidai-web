import "server-only";

import { es } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./types";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";
