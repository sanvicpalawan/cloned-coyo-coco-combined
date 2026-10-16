import { Link, useLocation } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { useBookingFlow } from '../context/BookingFlowContext';
import {
  BASE_CURRENCY,
  DISPLAY_CURRENCIES,
  useDisplayCurrency,
} from '../lib/displayCurrency';

export function Layout({ children }: { children: React.ReactNode }) {
  const { config } = useConfig();
  const { branding, requestSubmissionStatus, reset } = useBookingFlow();
  const { displayCurrency, setDisplayCurrency } = useDisplayCurrency();
  const { pathname } = useLocation();
  const isRequestFlow = pathname.startsWith('/request/');
  const displayName =
    branding?.displayName ?? config?.displayName ?? 'Book your stay';

  return (
    <div className="haip-booking min-h-screen bg-gray-50">
      <header
        className="border-b border-gray-200 bg-white"
        style={{ borderTopWidth: 4, borderTopColor: 'var(--haip-primary, #06bdb4)' }}
      >
        <div className={`mx-auto flex items-center justify-between gap-3 px-4 py-4 ${isRequestFlow ? 'max-w-5xl' : 'max-w-3xl'}`}>
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900"
            aria-disabled={requestSubmissionStatus === 'pending'}
            tabIndex={requestSubmissionStatus === 'pending' ? -1 : undefined}
            onClick={(event) => {
              if (requestSubmissionStatus === 'pending') {
                event.preventDefault();
                return;
              }
              if (pathname === '/request/received') reset();
            }}
          >
            {displayName}
          </Link>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="sr-only sm:not-sr-only">Currency</span>
              <select
                value={displayCurrency}
                onChange={(event) => setDisplayCurrency(event.target.value)}
                aria-label="Display currency"
                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700"
              >
                {DISPLAY_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            {!isRequestFlow && (
              <Link
                to="/manage"
                className="text-sm font-medium"
                style={{ color: 'var(--haip-accent, #f2641b)' }}
              >
                Manage booking
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className={`mx-auto px-4 py-6 ${isRequestFlow ? 'max-w-5xl' : 'max-w-3xl'}`}>{children}</main>
      <footer className={`mx-auto px-4 py-6 text-center text-xs text-gray-400 ${isRequestFlow ? 'max-w-5xl' : 'max-w-3xl'}`}>
        Commission-free direct booking · Powered by Lodge PMS
        {displayCurrency !== BASE_CURRENCY && (
          <span className="mt-1 block">
            Prices are charged in Philippine pesos. {displayCurrency} amounts are
            converted estimates.
          </span>
        )}
      </footer>
    </div>
  );
}
