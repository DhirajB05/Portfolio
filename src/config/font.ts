/**
 * Vite replacement for devfolio-v2's `next/font/google` config.
 *
 * `next/font` returns objects with a `className` and a `variable` string.
 * Here we map them onto the Google Fonts families already loaded in
 * `index.html` and exposed as Tailwind theme tokens in `src/tailwind.css`,
 * so every devfolio component keeps working verbatim.
 */

export const instrumentSerif = {
  className: 'font-serif',
  variable: '--font-serif',
};

export const poppins = {
  className: 'font-sans',
  variable: '--font-sans',
};

export const geistMono = {
  className: 'font-mono',
  variable: '--font-geist-mono',
};

export const caveat = {
  className: 'font-caveat',
  variable: '--font-caveat',
};
