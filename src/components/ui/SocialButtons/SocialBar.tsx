import React from 'react';
import { SocialButton, SocialPlatform, SocialVariant } from './SocialButton';
import styles from './SocialButtons.module.css';

export interface SocialBarProps {
  platforms?: SocialPlatform[];
  variant?: SocialVariant;
  align?: 'left' | 'center' | 'right';
  className?: string;
  customMessage?: string;
  iconSize?: number;
}

// Verified active channels. WhatsApp is excluded until genuine business number is supplied by owner.
const DEFAULT_PLATFORMS: SocialPlatform[] = ['telegram', 'instagram', 'facebook'];

/**
 * Reusable Social Bar component to display a collection of social buttons/icons.
 */
export const SocialBar: React.FC<SocialBarProps> = ({
  platforms = DEFAULT_PLATFORMS,
  variant = 'icon',
  align = 'center',
  className = '',
  customMessage,
  iconSize,
}) => {
  return (
    <div className={`${styles.socialBar} ${styles[align]} ${className}`}>
      {platforms.map((platform) => (
        <SocialButton
          key={platform}
          platform={platform}
          variant={variant}
          customMessage={customMessage}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
};
