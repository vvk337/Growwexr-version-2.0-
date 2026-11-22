/**
 * useSEO – Dynamic per-page head management for Growwezy Global Tech
 * -------------------------------------------------------------------
 * Sets <title>, <meta name="description">, <link rel="canonical">,
 * Open Graph, Twitter Card, and robots directives without any
 * external library dependency.
 *
 * Usage:
 *   useSEO({ title: '...', description: '...', canonical: '/services' });
 */

import { useEffect } from 'react';

export interface SEOProps {
  /** Page <title> – should be ≤ 60 chars. Site suffix is appended automatically. */
  title: string;
  /** Meta description – should be 140–160 chars. */
  description: string;
  /** Canonical path, e.g. '/services/forex-signals'. Used to build the full URL. */
  canonical: string;
  /** Override og:image. Defaults to the brand OG image. */
  ogImage?: string;
  /** Override og:type. Defaults to 'website'. */
  ogType?: 'website' | 'article';
  /** If true, adds noindex,nofollow (for utility/legal pages that don't need ranking). */
  noIndex?: boolean;
  /** Additional robots directives, e.g. 'noarchive'. */
  robotsExtra?: string;
  /** Published date for articles (ISO string). */
  publishedTime?: string;
  /** Modified date for articles (ISO string). */
  modifiedTime?: string;
}

const SITE_NAME  = 'Growwezy Global Tech';
const BASE_URL   = 'https://growwezy.com';
const DEFAULT_OG = `${BASE_URL}/assets/og-growwezy.jpg`;
const TWITTER_HANDLE = '@teamgrowwezy';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeTag(selector: string) {
  document.querySelector(selector)?.remove();
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  ogType = 'website',
  noIndex = false,
  robotsExtra,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  useEffect(() => {
    const fullTitle   = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${BASE_URL}${canonical}`;

    // --- <title> ---
    document.title = fullTitle;

    // --- Meta description ---
    setMeta('description', description);

    // --- Robots ---
    const robotsContent = noIndex
      ? 'noindex,nofollow'
      : robotsExtra
        ? `index,follow,${robotsExtra}`
        : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';
    setMeta('robots', robotsContent);

    // --- Canonical ---
    setLink('canonical', canonicalUrl);

    // --- Open Graph ---
    setMeta('og:site_name',        SITE_NAME,    'property');
    setMeta('og:type',             ogType,       'property');
    setMeta('og:title',            fullTitle,    'property');
    setMeta('og:description',      description,  'property');
    setMeta('og:url',              canonicalUrl, 'property');
    setMeta('og:image',            ogImage,      'property');
    setMeta('og:image:secure_url', ogImage,      'property');
    setMeta('og:image:type',       'image/jpeg', 'property');
    setMeta('og:image:width',      '1200',       'property');
    setMeta('og:image:height',     '630',        'property');
    setMeta('og:image:alt',        title,        'property');
    setMeta('og:locale',           'en_US',      'property');

    if (ogType === 'article') {
      setMeta('og:article:publisher', 'https://www.facebook.com/profile.php?id=61586211570915', 'property');
      if (publishedTime) setMeta('article:published_time', publishedTime, 'property');
      if (modifiedTime)  setMeta('article:modified_time',  modifiedTime,  'property');
    } else {
      removeTag('meta[property="article:published_time"]');
      removeTag('meta[property="article:modified_time"]');
    }

    // --- Twitter Card ---
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:site',        TWITTER_HANDLE);
    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image',       ogImage);
    setMeta('twitter:image:alt',   title);

    // cleanup: restore sensible defaults if the component unmounts unexpectedly
    return () => {
      document.title = `${SITE_NAME} | Forex Advisory & Asset Management`;
    };
  }, [title, description, canonical, ogImage, ogType, noIndex, robotsExtra, publishedTime, modifiedTime]);
}
