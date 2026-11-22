/**
 * useJsonLd – Injects a JSON-LD <script> block into <head> for the current page.
 * Removes it on unmount to prevent duplicate schemas during SPA navigation.
 */

import { useEffect } from 'react';

export function useJsonLd(schema: Record<string, unknown> | Record<string, unknown>[]) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id   = 'json-ld-schema';
    script.textContent = JSON.stringify(schema, null, 0);
    document.head.appendChild(script);

    return () => {
      document.getElementById('json-ld-schema')?.remove();
    };
  }, [schema]);
}
