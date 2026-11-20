/**
 * Centralized Social Channels Configuration
 * -----------------------------------------
 * Update your official handles, phone numbers, and draft messages here.
 * Changes made here will automatically reflect everywhere across the site.
 */

export interface SocialConfig {
  instagram: {
    url: string;
    label: string;
  };
  facebook: {
    url: string;
    label: string;
  };
  whatsapp: {
    phoneNumber: string; // Digits only with country code (e.g. "971500000000")
    defaultMessage: string;
    label: string;
  };
  telegram: {
    username: string;    // Without @ symbol (e.g. "growwezy_official")
    defaultMessage: string;
    label: string;
  };
}

export const socialConfig: SocialConfig = {
  // Instagram profile URL (placeholder)
  instagram: {
    url: 'https://instagram.com/your_handle_here',
    label: 'Instagram',
  },

  // Facebook page URL (placeholder)
  facebook: {
    url: 'https://facebook.com/your_page_here',
    label: 'Facebook',
  },

  // WhatsApp configuration (placeholder)
  whatsapp: {
    phoneNumber: '971500000000', // Replace with your official WhatsApp number
    defaultMessage: 'Hi, I would like to know more about your services.',
    label: 'WhatsApp',
  },

  // Telegram configuration (placeholder)
  telegram: {
    username: 'your_telegram_username', // Replace with your Telegram username or group
    defaultMessage: 'Hi, I would like to know more about your services.',
    label: 'Telegram',
  },
};

/**
 * Generates the WhatsApp deep-link with prefilled text draft.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const phone = socialConfig.whatsapp.phoneNumber.replace(/\D/g, '');
  const text = encodeURIComponent(customMessage || socialConfig.whatsapp.defaultMessage);
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}

/**
 * Generates the Telegram deep-link with prefilled text draft.
 */
export function getTelegramUrl(customMessage?: string): string {
  const username = socialConfig.telegram.username.replace('@', '').trim();
  const text = encodeURIComponent(customMessage || socialConfig.telegram.defaultMessage);
  return username ? `https://t.me/${username}?text=${text}` : `https://t.me/?text=${text}`;
}

/**
 * Resolves the action link for any supported social platform.
 */
export function getSocialUrl(
  platform: 'whatsapp' | 'telegram' | 'instagram' | 'facebook',
  customMessage?: string
): string {
  switch (platform) {
    case 'whatsapp':
      return getWhatsAppUrl(customMessage);
    case 'telegram':
      return getTelegramUrl(customMessage);
    case 'instagram':
      return socialConfig.instagram.url;
    case 'facebook':
      return socialConfig.facebook.url;
    default:
      return '#';
  }
}
