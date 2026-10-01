import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

/**
 * Parses a string containing LaTeX equations delimited by:
 * - $$ ... $$ for display math (block)
 * - $ ... $ for inline math
 * 
 * Safely renders with KaTeX.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', block = false }) => {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    // If explicit block is requested and content is purely math
    if (block && !content.includes('$')) {
      try {
        return katex.renderToString(content, {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
      } catch (err) {
        console.error('KaTeX block render error:', err);
        return content;
      }
    }

    // Split by block math first: $$ ... $$
    const blockRegex = /\$\$([\s\S]*?)\$\$/g;
    let parts: { type: 'text' | 'block' | 'inline'; value: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = blockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: content.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'block', value: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: 'text', value: content.substring(lastIndex) });
    }

    // Now for text parts, split by inline math: $ ... $
    const finalParts: { type: 'text' | 'block' | 'inline'; value: string }[] = [];
    const inlineRegex = /\$([^$\n]+?)\$/g;

    for (const part of parts) {
      if (part.type === 'block') {
        finalParts.push(part);
        continue;
      }

      let text = part.value;
      let inlineLastIndex = 0;
      let inlineMatch: RegExpExecArray | null;

      while ((inlineMatch = inlineRegex.exec(text)) !== null) {
        if (inlineMatch.index > inlineLastIndex) {
          finalParts.push({ type: 'text', value: text.substring(inlineLastIndex, inlineMatch.index) });
        }
        finalParts.push({ type: 'inline', value: inlineMatch[1] });
        inlineLastIndex = inlineMatch.index + inlineMatch[0].length;
      }

      if (inlineLastIndex < text.length) {
        finalParts.push({ type: 'text', value: text.substring(inlineLastIndex) });
      }
    }

    // Convert to HTML
    return finalParts
      .map((item) => {
        if (item.type === 'block') {
          try {
            return katex.renderToString(item.value.trim(), {
              displayMode: true,
              throwOnError: false,
              strict: false,
            });
          } catch {
            return `<pre class="text-rose-500 font-mono text-xs">$$\n${item.value}\n$$</pre>`;
          }
        }
        if (item.type === 'inline') {
          try {
            return katex.renderToString(item.value.trim(), {
              displayMode: false,
              throwOnError: false,
              strict: false,
            });
          } catch {
            return `<code class="text-rose-500 font-mono text-xs">$${item.value}$</code>`;
          }
        }
        // Replace newlines with <br /> for regular text formatting if multi-line
        return item.value.replace(/\n/g, '<br />');
      })
      .join('');
  }, [content, block]);

  return (
    <span
      className={`math-rendered-container inline-block w-full leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};
