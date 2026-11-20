import React from 'react';
import { socialConfig, getSocialUrl } from '../../../config/socialChannels';
import { InstagramIcon, FacebookIcon, WhatsAppIcon, TelegramIcon } from './SocialIcons';
import styles from './SocialButtons.module.css';

export type SocialPlatform = 'whatsapp' | 'telegram' | 'instagram' | 'facebook';
export type SocialVariant = 'icon' | 'pill' | 'button';

export interface SocialButtonProps {
  platform: SocialPlatform;
  variant?: SocialVariant;
  customMessage?: string;
  className?: string;
  iconSize?: number;
  label?: string; // Optional custom label override
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  variant = 'icon',
  customMessage,
  className = '',
  iconSize = 20,
  label,
}) => {
  const url = getSocialUrl(platform, customMessage);
  const config = socialConfig[platform];
  const displayLabel = label || config.label;

  const renderIcon = () => {
    switch (platform) {
      case 'whatsapp':
        return <WhatsAppIcon size={iconSize} />;
      case 'telegram':
        return <TelegramIcon size={iconSize} />;
      case 'instagram':
        return <InstagramIcon size={iconSize} />;
      case 'facebook':
        return <FacebookIcon size={iconSize} />;
      default:
        return null;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'pill':
        return styles.pillVariant;
      case 'button':
        return styles.buttonVariant;
      case 'icon':
      default:
        return styles.iconVariant;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.socialLink} ${getVariantClass()} ${styles[platform]} ${className}`}
      aria-label={displayLabel}
      title={displayLabel}
    >
      {renderIcon()}
      {variant !== 'icon' && <span className={styles.labelText}>{displayLabel}</span>}
    </a>
  );
};
