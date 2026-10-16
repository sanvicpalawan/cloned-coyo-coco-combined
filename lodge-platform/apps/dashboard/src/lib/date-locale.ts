import type { Locale } from 'date-fns';
import { de, enUS, es, fr, hr, it, ptBR, srLatn } from 'date-fns/locale';

// date-fns 4.x ships no Filipino/Tagalog locale, so `tl` intentionally falls
// through to the en-US default below rather than being listed here.
const DATE_LOCALES: Record<string, Locale> = {
  de,
  en: enUS,
  es,
  fr,
  hr,
  it,
  pt: ptBR,
  sr: srLatn,
};

export function getDateLocale(language?: string): Locale {
  return DATE_LOCALES[language?.split('-')[0] ?? 'en'] ?? enUS;
}
