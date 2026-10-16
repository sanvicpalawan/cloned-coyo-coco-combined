import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

/**
 * Guest-facing display currency for the booking widget.
 *
 * The property's own currency (PHP for Cayo Coco) is the PRICE OF RECORD: every
 * quote, deposit and charge is calculated and settled in it. USD and EUR exist
 * only so a guest can read a price in a currency they think in — they are
 * converted ESTIMATES and nothing is ever charged in them.
 *
 * The rates below are static placeholders. Replace them with a live FX source
 * (or a scheduled rate table) before this faces real guests.
 */

/** Currency the property quotes and settles in. */
export const BASE_CURRENCY = 'PHP';

export const DISPLAY_CURRENCIES = [
  { code: 'PHP', label: 'PHP' },
  { code: 'USD', label: 'USD' },
  { code: 'EUR', label: 'EUR' },
] as const;

/** Indicative PHP → X rates. PLACEHOLDER — not live FX. */
const PER_PHP: Record<string, number> = {
  PHP: 1,
  USD: 1 / 58,
  EUR: 1 / 63,
};

export function convertFromBase(amount: number, to: string): number {
  const rate = PER_PHP[to];
  return rate === undefined ? amount : amount * rate;
}

/** Format a numeric amount in an explicit currency. */
export function formatIn(amount: number | string, currency: string): string {
  const value = typeof amount === 'string' ? Number(amount) : amount;
  if (!Number.isFinite(value)) return String(amount);
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

type DisplayCurrencyContextValue = {
  displayCurrency: string;
  setDisplayCurrency: (code: string) => void;
};

const DisplayCurrencyContext = createContext<DisplayCurrencyContextValue | null>(null);

const STORAGE_KEY = 'haip.booking.displayCurrency';

export function DisplayCurrencyProvider({ children }: { children: ReactNode }) {
  const [displayCurrency, setDisplayCurrency] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || BASE_CURRENCY;
    } catch {
      return BASE_CURRENCY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, displayCurrency);
    } catch {
      /* storage unavailable — the selection simply won't persist */
    }
  }, [displayCurrency]);

  const value = useMemo(
    () => ({ displayCurrency, setDisplayCurrency }),
    [displayCurrency],
  );

  return (
    <DisplayCurrencyContext.Provider value={value}>
      {children}
    </DisplayCurrencyContext.Provider>
  );
}

export function useDisplayCurrency(): DisplayCurrencyContextValue {
  return (
    useContext(DisplayCurrencyContext) ?? {
      displayCurrency: BASE_CURRENCY,
      setDisplayCurrency: () => {},
    }
  );
}

/**
 * Money formatter for guest-facing prices.
 *
 * Drop-in replacement for `money()` from `lib/format`: same signature, but it
 * renders the guest's chosen display currency (converted from the price of
 * record) instead of always using the booking currency.
 */
export function useMoney() {
  const { displayCurrency } = useDisplayCurrency();

  return useCallback(
    (amount: number | string, currency: string = BASE_CURRENCY): string => {
      const value = typeof amount === 'string' ? Number(amount) : amount;
      if (!Number.isFinite(value)) return String(amount);

      // Anything not quoted in the base currency is shown as-is: we have no
      // reliable rate for it, and showing the true figure beats inventing one.
      if (currency !== BASE_CURRENCY || displayCurrency === BASE_CURRENCY) {
        return formatIn(value, currency);
      }

      return `≈ ${formatIn(convertFromBase(value, displayCurrency), displayCurrency)}`;
    },
    [displayCurrency],
  );
}

/**
 * Money formatter for amounts that are actually charged.
 *
 * Always renders the amount in the currency it is settled in, so a guest who
 * chose USD still sees the exact peso figure at the point of payment.
 */
export function useChargeMoney() {
  const { displayCurrency } = useDisplayCurrency();

  return useCallback(
    (amount: number | string, currency: string = BASE_CURRENCY): string => {
      const primary = formatIn(amount, currency);
      if (displayCurrency === currency || currency !== BASE_CURRENCY) return primary;

      const value = typeof amount === 'string' ? Number(amount) : amount;
      if (!Number.isFinite(value)) return primary;
      return `${primary} (≈ ${formatIn(convertFromBase(value, displayCurrency), displayCurrency)})`;
    },
    [displayCurrency],
  );
}
