/** Optional typography overrides shared by Text, Lead, Quote and Stat. */
export interface TypoProps {
  /** Font size in px at desktop width (scales down on small screens). */
  size?: number;
  weight?: number;
  /** "body" (Lexend), "display" (Fivo Sans Modern), "alt" (Pangram) or a font name. */
  font?: string;
  align?: 'start' | 'center' | 'end' | 'right' | 'justify';
  color?: string;
  /** Line height as a multiple of the font size. */
  lh?: number;
}

const fontVar: Record<string, string> = {
  body: 'var(--font-body)',
  display: 'var(--font-display)',
  alt: 'var(--font-alt)',
};

export function typoStyle({ size, weight, font, align, color, lh }: TypoProps): string | undefined {
  const s = [
    size && `--fs: ${size}`,
    weight && `font-weight: ${weight}`,
    font && `font-family: ${fontVar[font] ?? `'${font}', var(--font-body)`}`,
    align && `text-align: ${align}`,
    color && `color: ${color}`,
    lh && `line-height: ${lh}`,
  ].filter(Boolean);
  return s.length ? s.join('; ') : undefined;
}
