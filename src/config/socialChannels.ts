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
  // Instagram profile URL
  instagram: {
    url: 'https://www.instagram.com/teamgrowwezy/',
    label: 'Instagram',
  },

  // Facebook page URL
  facebook: {
    url: 'https://www.facebook.com/profile.php?id=61586211570915',
    label: 'Facebook',
  },

  // WhatsApp configuration (leave as is per user instruction)
  whatsapp: {
    phoneNumber: '971500000000', // To be updated later
    defaultMessage: 'Hi, I would like to know more about your services.',
    label: 'WhatsApp',
  },

  // Telegram configuration
  telegram: {
    username: 'growwezyglobaltech',
    defaultMessage: '',
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
  const username = socialConfig.telegram.username.replace('@', '').replace('https://t.me/', '').trim();
  const message = customMessage || socialConfig.telegram.defaultMessage;
  if (message) {
    const text = encodeURIComponent(message);
    return username ? `https://t.me/${username}?text=${text}` : `https://t.me/?text=${text}`;
  }
  return username ? `https://t.me/${username}` : `https://t.me/`;
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
