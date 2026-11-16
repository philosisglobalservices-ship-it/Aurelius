import { Car } from '../types';
import { formatPrice } from './currency';

/**
 * Clean phone number to WhatsApp international standard (digits only, e.g. 2348038904653)
 */
export function sanitizeWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  // If user entered local Nigerian format starting with 0, convert to 234
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Generates an instant WhatsApp chat link formatted for Nigerian car price negotiation
 */
export function createWhatsAppNegotiationUrl(
  dealerPhone: string,
  car: Car,
  buyerDetails: {
    name: string;
    phone: string;
    offeredPrice?: number;
    tradeIn?: string;
    deliveryState?: string;
    message?: string;
  }
): string {
  const cleanPhone = sanitizeWhatsAppNumber(dealerPhone);
  
  const text = [
    `*🚨 CAR NEGOTIATION / PRICE INQUIRY (AURELIUS MOTORS NIGERIA)*`,
    `*Vehicle:* ${car.year} ${car.title}`,
    `*Stock #:* ${car.stockNumber}`,
    `*Showroom Price:* ${formatPrice(car.price, 'NGN')}`,
    buyerDetails.offeredPrice ? `*My Proposed Offer:* ${formatPrice(buyerDetails.offeredPrice, 'NGN')}` : '',
    buyerDetails.deliveryState ? `*Delivery Destination:* ${buyerDetails.deliveryState}` : '',
    buyerDetails.tradeIn ? `*Trade-in / Swap Vehicle:* ${buyerDetails.tradeIn}` : '',
    `--------------------------`,
    `*Buyer Name:* ${buyerDetails.name}`,
    `*Buyer Phone:* ${buyerDetails.phone}`,
    buyerDetails.message ? `*Buyer Notes:* ${buyerDetails.message}` : '',
    `--------------------------`,
    `Sent from Aurelius Motors Nigeria (Victoria Island & Maitama Abuja Showrooms)`
  ].filter(Boolean).join('\n');

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
}

/**
 * Generates an instant general WhatsApp link
 */
export function createGeneralWhatsAppUrl(
  dealerPhone: string,
  customMessage: string = 'Hello Aurelius Motors Nigeria, I am inquiring about viewing your exotic motorcar inventory in Victoria Island or Maitama.'
): string {
  const cleanPhone = sanitizeWhatsAppNumber(dealerPhone);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(customMessage)}`;
}
