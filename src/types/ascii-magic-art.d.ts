declare module 'ascii-magic-art/runtime/player.js' {
  interface PlayOptions {
    speed?: number;
    still?: boolean;
    dom?: boolean;
    t0?: number;
    maxFps?: number;
    look?: Record<string, unknown>;
    onFrame?: (frame: unknown, t: number) => void;
  }

  export function play(
    element: HTMLElement,
    mod: unknown,
    opts?: PlayOptions
  ): () => void;
}

declare module 'ascii-magic-art/runtime/canvas.js' {
  export interface PaintOptions {
    x?: number;
    y?: number;
    cw: number;
    ch: number;
    ink?: string;
    mode?: 'text' | 'circle' | 'square' | 'dither';
    size?: number;
    steps?: number;
    invert?: boolean;
    mono?: boolean;
    lift?: boolean;
    dpr?: number;
    density?: number;
    gamma?: number;
    boost?: number;
    look?: string;
    tone?: Record<string, unknown>;
  }

  export function paint(
    ctx: CanvasRenderingContext2D,
    frame: unknown,
    palette: unknown,
    opts: PaintOptions
  ): void;
}

interface LighthouseFrame {
  text: string;
  color?: string;
  palette?: Record<string, string>;
}

declare module 'ascii-magic-art/pieces/cliff-lighthouse-night.js' {
  export const meta: {
    cols: number;
    rows: number;
    fps: number;
    cell: string;
    look: string;
    dots?: Record<string, unknown>;
    palette?: Record<string, string>;
  };

  export default function create(): (t: number) => LighthouseFrame;
}
