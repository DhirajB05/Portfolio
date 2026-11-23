/**
 * Tiny local replacement for `@tailwindcss/vite`.
 *
 * The sandbox has no npm registry access, so the published Vite plugin
 * could not be installed. `@tailwindcss/node` + `@tailwindcss/oxide` are the
 * exact compiler + source scanner the official plugin uses, so this does the
 * same job in ~30 lines: compile the Tailwind entry CSS and feed it every
 * candidate class found in the project's source files.
 *
 * If you later get network access you can replace this with the official
 * plugin (`npm i -D @tailwindcss/vite`, add `tailwindcss()` to `plugins`).
 */
import path from 'node:path';

import { compile } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';

const TAILWIND_MARKER = 'tailwindcss/theme.css';

const DEFAULT_SOURCES = [
  { base: '', pattern: 'src/**/*.{ts,tsx,js,jsx,html}', negated: false },
  { base: '', pattern: 'index.html', negated: false },
];

export function tailwindLocal() {
  let root = process.cwd();

  return {
    name: 'tailwindcss-local-compiler',
    enforce: 'pre',

    configResolved(config) {
      root = config.root;
    },

    async transform(code, id) {
      if (!id.endsWith('.css') || !code.includes(TAILWIND_MARKER)) {
        return null;
      }

      const compiler = await compile(code, {
        base: path.dirname(id),
        onDependency() {},
      });

      const sources = (compiler.sources.length ? compiler.sources : DEFAULT_SOURCES).map(
        (source) => ({
          base: source.base || root,
          pattern: source.pattern,
          negated: source.negated,
        })
      );

      const scanner = new Scanner({ sources });
      const candidates = scanner.scan();

      return {
        code: compiler.build(candidates),
        map: null,
      };
    },
  };
}

export default tailwindLocal;
