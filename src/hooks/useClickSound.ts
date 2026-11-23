import { useEffect } from 'react';

type AudioContextConstructor = new () => AudioContext;

let audioContext: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  const AudioContextCtor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: AudioContextConstructor })
      .webkitAudioContext;

  if (!AudioContextCtor) return null;
  audioContext ??= new AudioContextCtor();
  return audioContext;
};

/** A tiny, cached noise burst gives the click a short, crisp snap. */
const getNoiseBuffer = (context: AudioContext): AudioBuffer => {
  if (noiseBuffer && noiseBuffer.sampleRate === context.sampleRate) {
    return noiseBuffer;
  }

  const length = Math.floor(context.sampleRate * 0.032);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    const decay = Math.pow(1 - index / length, 5);
    data[index] = (Math.random() * 2 - 1) * decay;
  }

  noiseBuffer = buffer;
  return buffer;
};

export const playClickSound = (): void => {
  const context = getAudioContext();
  if (!context) return;

  const emit = () => {
    if (context.state !== 'running') return;

    const now = context.currentTime;

    const noise = context.createBufferSource();
    noise.buffer = getNoiseBuffer(context);

    const highpass = context.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(2200, now);

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(context.destination);
    noise.start(now);
    noise.stop(now + 0.032);

    const tick = context.createOscillator();
    tick.type = 'square';
    tick.frequency.setValueAtTime(1900, now);
    tick.frequency.exponentialRampToValueAtTime(900, now + 0.018);

    const tickGain = context.createGain();
    tickGain.gain.setValueAtTime(0.018, now);
    tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

    tick.connect(tickGain);
    tickGain.connect(context.destination);
    tick.start(now);
    tick.stop(now + 0.024);
  };

  if (context.state === 'running') emit();
  else void context.resume().then(emit).catch(() => undefined);
};

/** Plays a short Web Audio click for every user click, without new assets. */
export const useClickSound = (): void => {
  useEffect(() => {
    const handleClick = () => playClickSound();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};
