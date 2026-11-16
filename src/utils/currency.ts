export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  NGN: { symbol: '₦', rate: 1.0, label: 'Naira (₦ NGN)' },
  USD: { symbol: '$', rate: 1 / 1550, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 1 / 1980, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 1 / 1680, label: 'EUR (€)' }
};

/**
 * Prices in our database are stored in Nigerian Naira (NGN).
 * This formats amounts in NGN with the Nigerian Naira sign (₦), or converts to USD/GBP/EUR if selected.
 */
export function formatPrice(amountInNGN: number, currency: CurrencyCode = 'NGN'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.NGN;
  
  if (currency === 'NGN') {
    return `${info.symbol}${Math.round(amountInNGN).toLocaleString('en-NG')}`;
  }

  const converted = Math.round(amountInNGN * info.rate);
  return `${info.symbol}${converted.toLocaleString('en-US')}`;
}

export function formatMileage(milesOrKm: number, unit: 'km' | 'mi' = 'km'): string {
  return `${milesOrKm.toLocaleString('en-NG')} ${unit}`;
}

export function formatNairaWords(amountInNGN: number): string {
  if (amountInNGN >= 1_000_000_000) {
    return `₦${(amountInNGN / 1_000_000_000).toFixed(2)} Billion`;
  }
  if (amountInNGN >= 1_000_000) {
    return `₦${(amountInNGN / 1_000_000).toFixed(1)} Million`;
  }
  return `₦${amountInNGN.toLocaleString('en-NG')}`;
}
