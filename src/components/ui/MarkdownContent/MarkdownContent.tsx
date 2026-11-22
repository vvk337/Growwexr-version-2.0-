import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MarkdownContent.module.css';

interface MarkdownContentProps {
  content: string[] | string;
  className?: string;
}

/**
 * Parses inline formatting: **bold** and [text](url)
 */
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Regex to match [text](url) OR **bold**
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Link match: match[2] = text, match[3] = url
      const linkText = match[2];
      const linkUrl = match[3];
      if (linkUrl.startsWith('/')) {
        parts.push(
          <Link key={match.index} to={linkUrl}>
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>
        );
      }
    } else if (match[4]) {
      // Bold match: match[4] = text
      parts.push(<strong key={match.index}>{match[4]}</strong>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className }) => {
  const blocks: string[] = Array.isArray(content)
    ? content
    : content.split(/\n\n+/).filter(Boolean);

  return (
    <div className={`${styles.markdownBody} ${className || ''}`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Level 2 Heading
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx}>{parseInline(trimmed.replace(/^##\s+/, ''))}</h2>;
        }

        // Level 3 Heading
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx}>{parseInline(trimmed.replace(/^###\s+/, ''))}</h3>;
        }

        // Level 4 Heading
        if (trimmed.startsWith('#### ')) {
          return <h4 key={idx}>{parseInline(trimmed.replace(/^####\s+/, ''))}</h4>;
        }

        // Callout Blockquote
        if (trimmed.startsWith('> ')) {
          const calloutText = trimmed
            .split('\n')
            .map((l) => l.replace(/^>\s*/, ''))
            .join(' ');
          return (
            <div key={idx} className={styles.calloutBox}>
              <p>{parseInline(calloutText)}</p>
            </div>
          );
        }

        // Unordered List (lines starting with - or *)
        if (trimmed.split('\n').every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
          const items = trimmed.split('\n').map((l) => l.trim().replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx}>
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{parseInline(item)}</li>
              ))}
            </ul>
          );
        }

        // Markdown Table
        if (trimmed.includes('|') && trimmed.includes('\n')) {
          const lines = trimmed.split('\n').filter((l) => l.trim().startsWith('|'));
          if (lines.length >= 2) {
            const headerCells = lines[0]
              .split('|')
              .filter((_, i, arr) => i > 0 && i < arr.length - 1)
              .map((c) => c.trim());
            const bodyRows = lines
              .slice(2) // Skip separator line |---|---|
              .map((row) =>
                row
                  .split('|')
                  .filter((_, i, arr) => i > 0 && i < arr.length - 1)
                  .map((c) => c.trim())
              );

            return (
              <div key={idx} className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {headerCells.map((h, hIdx) => (
                        <th key={hIdx}>{parseInline(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{parseInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Default Paragraph
        return <p key={idx}>{parseInline(trimmed)}</p>;
      })}
    </div>
  );
};
