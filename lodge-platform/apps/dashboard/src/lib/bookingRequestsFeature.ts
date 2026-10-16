/** Mirrors server BAIA_BOOKING_REQUESTS for dashboard UI gating. */
export function isBookingRequestsUiEnabled(): boolean {
  return import.meta.env.VITE_BAIA_BOOKING_REQUESTS === 'true';
}
