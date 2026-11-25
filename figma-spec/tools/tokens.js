// Single source of truth for Figma variables & styles. Derived from deployed site usage (analyze.js) + IDENTIDAD_DE_MARCA.md
const P = { // Primitives: name -> [hex, alpha, webSyntax]
  'color/white': ['#FFFFFF', 1, 'var(--color-white)'],
  'color/black': ['#000000', 1, 'var(--color-black)'],
  'color/gray/50': ['#F9FAFB', 1, 'var(--color-gray-50)'],
  'color/gray/100': ['#F3F4F6', 1, 'var(--color-gray-100)'],
  'color/gray/200': ['#E5E7EB', 1, 'var(--color-gray-200)'],
  'color/gray/300': ['#D1D5DC', 1, 'var(--color-gray-300)'],
  'color/gray/400': ['#99A1AF', 1, 'var(--color-gray-400)'],
  'color/gray/500': ['#6A7282', 1, 'var(--color-gray-500)'],
  'color/gray/600': ['#4A5565', 1, 'var(--color-gray-600)'],
  'color/gray/700': ['#364153', 1, 'var(--color-gray-700)'],
  'color/gray/800': ['#1E2939', 1, 'var(--color-gray-800)'],
  'color/gray/900': ['#101828', 1, 'var(--color-gray-900)'],
  'color/neutral/950': ['#0A0A0A', 1, 'var(--color-neutral-950)'],
  'color/ink/900': ['#111827', 1, 'var(--color-ink-900)'],
  'color/teal/25': ['#F8FEFE', 1, 'var(--surface-hero)'],
  'color/teal/500': ['#037070', 1, 'var(--brand-teal-hover)'],
  'color/teal/600': ['#025959', 1, 'var(--brand-teal)'],
  'color/teal/700': ['#014040', 1, 'var(--brand-teal-deep)'],
  'color/teal/800': ['#012E2E', 1, 'var(--brand-teal-night)'],
  'color/orange/500': ['#FF8300', 1, 'var(--brand-orange)'],
  'color/orange/600': ['#E87500', 1, 'var(--brand-orange-hover)'],
  'color/emerald/50': ['#ECFDF5', 1, 'var(--color-emerald-50)'],
  'color/emerald/500': ['#00BC7D', 1, 'var(--color-emerald-500)'],
  'color/emerald/700': ['#007A55', 1, 'var(--color-emerald-700)'],
  'color/green/700': ['#008236', 1, 'var(--color-green-700)'],
  'color/rose/400': ['#FF637E', 1, 'var(--color-rose-400)'],
  'color/red/600': ['#DC2626', 1, 'var(--color-red-600)'],
  'color/product/milestone/indigo': ['#4A4E78', 1, 'var(--milestone-primary)'],
  'color/product/milestone/gold': ['#B08B5A', 1, 'var(--milestone-secondary)'],
  'color/product/milestone/gold-hover': ['#C4A276', 1, 'var(--milestone-secondary-hover)'],
  'color/product/milestone/sage': ['#7C9885', 1, 'var(--milestone-tertiary)'],
  'color/product/milestone/bronze': ['#7A5E36', 1, 'var(--milestone-bronze)'],
  'color/product/milestone/ochre': ['#7A5C22', 1, 'var(--milestone-ochre)'],
  'color/product/iupi/blue': ['#004AAC', 1, 'var(--iupi-primary)'],
  'color/product/bank/violet': ['#7C3AED', 1, 'var(--bank-primary)'],
};
// alpha primitives
const A = { teal: ['#025959', [4, 5, 8, 9, 10, 12, 18, 20, 25, 30, 40], '--brand-teal'], orange: ['#FF8300', [5, 9, 10, 12, 14, 20], '--brand-orange'], white: ['#FFFFFF', [10, 15, 20, 30, 70, 80, 85, 90], '--color-white'], indigo: ['#4A4E78', [8, 9, 10, 18, 30, 40], '--milestone-primary'], gold: ['#B08B5A', [5, 10, 13, 25], '--milestone-secondary'] };
for (const [nm, [hex, list, css]] of Object.entries(A)) for (const a of list) {
  const base = nm === 'indigo' ? 'color/product/milestone/indigo' : nm === 'gold' ? 'color/product/milestone/gold' : `color/${nm}`;
  P[`${base}/alpha/${a}`] = [hex, a / 100, `color-mix(in srgb, var(${css}) ${a}%, transparent)`];
}
// Semantic (Light) -> alias primitive.  [name, primitive, scopes, web]
const S = [
  ['text/heading', 'color/gray/800', 'T', '--text-strong'], ['text/body', 'color/gray/600', 'T', '--text-body'], ['text/muted', 'color/gray/500', 'T', '--text-muted'],
  ['text/strong', 'color/gray/900', 'T', '--text-strongest'], ['text/subtle', 'color/gray/700', 'T', '--text-subtle'], ['text/disabled', 'color/gray/400', 'T', '--text-disabled'],
  ['text/brand', 'color/teal/600', 'T', '--brand-teal'], ['text/accent', 'color/orange/500', 'T', '--brand-orange'],
  ['text/inverse', 'color/white', 'T', '--text-inverse'], ['text/inverse-muted', 'color/white/alpha/90', 'T', '--text-inverse-muted'], ['text/inverse-subtle', 'color/white/alpha/30', 'T', '--text-inverse-subtle'],
  ['text/success', 'color/green/700', 'T', '--success'],
  ['bg/default', 'color/white', 'F', '--surface'], ['bg/subtle', 'color/gray/50', 'F', '--surface-alt'], ['bg/muted', 'color/gray/100', 'F', '--surface-muted'],
  ['bg/hero', 'color/teal/25', 'F', '--surface-hero'], ['bg/brand', 'color/teal/600', 'F', '--brand-teal'], ['bg/brand-hover', 'color/teal/500', 'F', '--brand-teal-hover'], ['bg/brand-deep', 'color/teal/700', 'F', '--brand-teal-deep'],
  ['bg/accent', 'color/orange/500', 'F', '--brand-orange'], ['bg/accent-hover', 'color/orange/600', 'F', '--brand-orange-hover'],
  ['bg/brand-tint', 'color/teal/alpha/8', 'F', '--surface-brand-tint'], ['bg/brand-soft', 'color/teal/alpha/10', 'F', '--surface-brand-soft'], ['bg/brand-subtle', 'color/teal/alpha/5', 'F', '--surface-brand-subtle'],
  ['bg/accent-soft', 'color/orange/alpha/10', 'F', '--surface-accent-soft'], ['bg/accent-subtle', 'color/orange/alpha/5', 'F', '--surface-accent-subtle'],
  ['bg/glass', 'color/white/alpha/10', 'F', '--surface-glass'], ['bg/inverse', 'color/ink/900', 'F', '--surface-inverse'], ['bg/success', 'color/emerald/500', 'F', '--status-online'],
  ['border/default', 'color/gray/100', 'S', '--border'], ['border/strong', 'color/gray/200', 'S', '--border-strong'], ['border/brand-subtle', 'color/teal/alpha/18', 'S', '--border-brand-subtle'],
  ['border/brand', 'color/teal/600', 'S', '--border-brand'], ['border/glass', 'color/white/alpha/15', 'S', '--border-glass'], ['border/inverse', 'color/white', 'S', '--border-inverse'],
];
// Case theme (modes Brand / Milestone)
const CASE = [
  ['case/primary', 'color/teal/600', 'color/product/milestone/indigo', 'FTS', '--case-primary'],
  ['case/secondary', 'color/orange/500', 'color/product/milestone/gold', 'FTS', '--case-secondary'],
  ['case/secondary-hover', 'color/orange/600', 'color/product/milestone/gold-hover', 'F', '--case-secondary-hover'],
  ['case/primary-tint', 'color/teal/alpha/8', 'color/product/milestone/indigo/alpha/8', 'F', '--case-primary-tint'],
  ['case/primary-border', 'color/teal/alpha/18', 'color/product/milestone/indigo/alpha/18', 'S', '--case-primary-border'],
  ['case/secondary-tint', 'color/orange/alpha/14', 'color/product/milestone/gold/alpha/13', 'F', '--case-secondary-tint'],
  ['case/on-secondary', 'color/white', 'color/ink/900', 'T', '--case-on-secondary'],
];
const SPACE = { '0.5': 2, '1': 4, '1.5': 6, '2': 8, '2.5': 10, '3': 12, '3.5': 14, '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '10': 40, '12': 48, '14': 56, '16': 64, '20': 80, '24': 96, '28': 112, '32': 128 };
const RADIUS = { 'xs': 4, 'md': 8, 'lg': 10, 'xl': 14, '2xl': 16, '3xl': 24, 'full': 9999 };
const FONT = { family: { sans: 'Inter', serif: 'Instrument Serif', mono: 'JetBrains Mono', 'milestone-display': 'Manrope' },
  size: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48, '6xl': 60, '7xl': 72, '8xl': 96 },
  weight: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 } };
const MOTION = { 'duration/fast': 200, 'duration/base': 600, 'duration/page': 380, 'duration/exit': 180, 'duration/ticker': 28000 };
// Text styles: [name, family, size, weight, italic, lineHeight(px), letterSpacing(px), upper]
const TS = [
  ['Display/XL', 'Inter', 72, 800, 0, 77.76, 0], ['Display/L', 'Inter', 60, 800, 0, 63, 0], ['Display/M', 'Inter', 36, 800, 0, 38.88, 0],
  ['Heading/Section', 'Inter', 48, 500, 0, 48, 0], ['Heading/Section Mobile', 'Inter', 36, 500, 0, 40, 0],
  ['Heading/H1', 'Inter', 48, 700, 0, 66, 0], ['Heading/H2', 'Inter', 36, 700, 0, 40, 0], ['Heading/H3', 'Inter', 30, 700, 0, 36, 0],
  ['Heading/H4', 'Inter', 24, 700, 0, 32, 0], ['Heading/H5', 'Inter', 20, 700, 0, 28, 0], ['Heading/H6', 'Inter', 18, 700, 0, 28, 0],
  ['Heading/Subsection', 'Inter', 24, 500, 0, 32, 0], ['Heading/Subsection L', 'Inter', 30, 500, 0, 36, 0],
  ['Body/Lead', 'Inter', 20, 400, 0, 32.5, 0], ['Body/L Relaxed', 'Inter', 18, 400, 0, 29.25, 0], ['Body/L', 'Inter', 18, 400, 0, 28, 0],
  ['Body/L Medium', 'Inter', 18, 500, 0, 28, 0.45], ['Body/L Semibold', 'Inter', 18, 600, 0, 28, 0],
  ['Body/M Relaxed', 'Inter', 16, 400, 0, 26, 0], ['Body/M', 'Inter', 16, 400, 0, 24, 0], ['Body/M Medium', 'Inter', 16, 500, 0, 24, 0], ['Body/M Semibold', 'Inter', 16, 600, 0, 24, 0], ['Body/M Bold', 'Inter', 16, 700, 0, 24, 0],
  ['Body/S', 'Inter', 14, 400, 0, 20, 0], ['Body/S Relaxed', 'Inter', 14, 400, 0, 22.75, 0], ['Body/S Italic', 'Inter', 14, 400, 1, 20, 0], ['Body/S Medium', 'Inter', 14, 500, 0, 20, 0], ['Body/S Semibold', 'Inter', 14, 600, 0, 20, 0], ['Body/S Bold', 'Inter', 14, 700, 0, 20, 0],
  ['Caption/Regular', 'Inter', 12, 400, 0, 16, 0], ['Caption/Relaxed', 'Inter', 12, 400, 0, 19.5, 0], ['Caption/Italic', 'Inter', 12, 400, 1, 16, 0], ['Caption/Medium', 'Inter', 12, 500, 0, 16, 0], ['Caption/Medium Tight', 'Inter', 12, 500, 0, 15, 0], ['Caption/Semibold', 'Inter', 12, 600, 0, 16, 0], ['Caption/Bold', 'Inter', 12, 700, 0, 16, 0],
  ['Eyebrow/Bold', 'Inter', 12, 700, 0, 16, 1.2, 1], ['Eyebrow/Semibold', 'Inter', 12, 600, 0, 16, 1.2, 1], ['Eyebrow/Regular', 'Inter', 12, 400, 0, 16, 1.2, 1], ['Eyebrow/Tag', 'Inter', 12, 600, 0, 16, 0.3, 1],
  ['Metric/XL', 'Inter', 36, 900, 0, 40, 0], ['Metric/L', 'Inter', 30, 900, 0, 36, 0], ['Metric/M', 'Inter', 24, 900, 0, 32, 0], ['Metric/S', 'Inter', 20, 900, 0, 28, 0],
  ['Quote/Mark', 'Inter', 96, 400, 0, 96, 0], ['Quote/L', 'Inter', 48, 400, 0, 78, 0],
  ['Code/Regular', 'JetBrains Mono', 12, 400, 0, 16, 0], ['Code/Bold', 'JetBrains Mono', 12, 700, 0, 16, 0],
  ['Serif/Quote L', 'Instrument Serif', 20, 400, 1, 27.5, 0], ['Serif/Quote M', 'Instrument Serif', 18, 400, 1, 28, 0],
];
// Effect styles: [name, [shadows...]] shadow = [type, hex, alpha, x, y, blur, spread]
const FX = [
  ['Shadow/sm', [['D', '#000000', .1, 0, 1, 3, 0], ['D', '#000000', .1, 0, 1, 2, -1]]],
  ['Shadow/md', [['D', '#000000', .1, 0, 4, 6, -1], ['D', '#000000', .1, 0, 2, 4, -2]]],
  ['Shadow/lg', [['D', '#000000', .1, 0, 10, 15, -3], ['D', '#000000', .1, 0, 4, 6, -4]]],
  ['Shadow/xl', [['D', '#000000', .1, 0, 20, 25, -5], ['D', '#000000', .1, 0, 8, 10, -6]]],
  ['Shadow/2xl', [['D', '#000000', .25, 0, 25, 50, -12]]],
  ['Shadow/inner', [['I', '#000000', .05, 0, 2, 4, 0]]],
  ['Shadow/Brand/CTA', [['D', '#025959', .3, 0, 10, 28, 0]]],
  ['Shadow/Brand/CTA Hover', [['D', '#025959', .4, 0, 14, 32, 0]]],
  ['Shadow/Brand/Card Hover', [['D', '#025959', .157, 0, 16, 36, 0]]],
  ['Shadow/Accent/CTA Hover', [['D', '#FF8300', .55, 0, 16, 50, 0]]],
  ['Shadow/Accent/Button Hover', [['D', '#FF8300', .3, 0, 8, 24, 0]]],
  ['Shadow/Device', [['D', '#000000', .34, 0, 24, 64, 0], ['D', '#000000', .1, 0, 0, 0, 1]]],
  ['Shadow/Mockup', [['D', '#000000', .22, 0, 20, 56, 0]]],
];
module.exports = { P, S, CASE, SPACE, RADIUS, FONT, MOTION, TS, FX };
