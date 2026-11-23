import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from 'react';

import { Shuffle } from 'lucide-react';

import { tracks } from '@/config/music';

const ACCENT = '#00DA5A';
const BACKGROUND = '#111111';

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return '0:00';

  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const secs = date.getUTCSeconds().toString().padStart(2, '0');

  return hours
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs}`
    : `${minutes}:${secs}`;
};

/** Build a play order with the current track first and the rest shuffled. */
const buildOrder = (shuffle: boolean, current: number): number[] => {
  const rest = tracks
    .map((_, index) => index)
    .filter((index) => index !== current);

  if (shuffle) {
    for (let index = rest.length - 1; index > 0; index -= 1) {
      const random = Math.floor(Math.random() * (index + 1));
      [rest[index], rest[random]] = [rest[random], rest[index]];
    }
  }

  return [current, ...rest];
};

const controlButton: CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.6)',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Local port of the Framer "Pro Audio Podcast Player" component.
 *
 * The original module depends on `framer` and `react-player`; this version keeps
 * its visual design and interactions while using the site's existing local MP3s
 * and a plain HTML audio element, so no new packages are needed.
 */
const ProAudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() => buildOrder(true, 0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedRatio, setPlayedRatio] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = tracks[0]?.url ?? '';
    audio.load();

    return () => audio.pause();
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [muted, volume]);

  const startAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      isPlayingRef.current = true;
      setIsPlaying(true);
    } catch {
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  const selectTrack = useCallback(
    async (next: number, shouldResume: boolean) => {
      const audio = audioRef.current;
      setTrackIndex(next);
      setPlayedRatio(0);
      setPlayedSeconds(0);
      setDuration(0);

      if (!audio) return;

      audio.src = tracks[next]?.url ?? '';
      audio.load();

      if (shouldResume) await startAudio();
    },
    [startAudio]
  );

  const changeTrack = useCallback(
    async (step: number, shouldResume = isPlayingRef.current) => {
      if (!order.length) return;

      const position = order.indexOf(trackIndex);
      const nextPosition = (position + step + order.length) % order.length;
      await selectTrack(order[nextPosition], shouldResume);
    },
    [order, selectTrack, trackIndex]
  );

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) void startAudio();
    else pauseAudio();
  };

  // Shuffle is always on; clicking the button reshuffles the upcoming tracks.
  const reshuffle = () => setOrder(buildOrder(true, trackIndex));

  const handleSpeedToggle = () => {
    const speeds = [1, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIndex]);
  };

  const seekTo = (ratio: number) => {
    const audio = audioRef.current;
    const total = audio?.duration ?? duration;

    if (!audio || !Number.isFinite(total) || total <= 0) return;

    const next = Math.max(0, Math.min(ratio, 0.999999)) * total;
    audio.currentTime = next;
    setPlayedSeconds(next);
    setPlayedRatio(next / total);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
    if (muted) setMuted(false);
  };

  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(event.target.value);
    setPlayedRatio(next);
    setPlayedSeconds(next * duration);
  };

  const track = tracks[trackIndex];
  if (!track) return null;

  return (
    <div
      style={{
        width: '100%',
        background: `linear-gradient(145deg, ${BACKGROUND} 0%, #050505 100%)`,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 20,
        padding: 24,
        boxShadow:
          '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {track.cover ? (
          <img
            key={track.cover}
            src={track.cover}
            alt={`${track.title} cover art`}
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              objectFit: 'cover',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              background:
                'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              flexShrink: 0,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5v14M7 5v14M22 9v6M2 9v6" />
            </svg>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {track.title}
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 14,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {track.artist}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            position: 'relative',
            height: 6,
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 3,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${playedRatio * 100}%`,
              background: ACCENT,
              borderRadius: 3,
              pointerEvents: 'none',
            }}
          />
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={playedRatio}
            aria-label="Seek audio"
            onMouseDown={() => setIsSeeking(true)}
            onChange={handleSeekChange}
            onMouseUp={(event) => {
              setIsSeeking(false);
              seekTo(parseFloat(event.currentTarget.value));
            }}
            onTouchStart={() => setIsSeeking(true)}
            onTouchEnd={(event) => {
              setIsSeeking(false);
              seekTo(parseFloat(event.currentTarget.value));
            }}
            style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              height: 14,
              opacity: 0,
              cursor: 'pointer',
              margin: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -4,
              left: `calc(${playedRatio * 100}% - 7px)`,
              width: 14,
              height: 14,
              background: ACCENT,
              borderRadius: '50%',
              pointerEvents: 'none',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span>{formatTime(playedSeconds)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: 64,
          }}
          onMouseEnter={() => setIsHoveringVolume(true)}
          onMouseLeave={() => setIsHoveringVolume(false)}
        >
          <button
            type="button"
            onClick={() => setMuted((previous) => !previous)}
            aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
            style={controlButton}
          >
            {muted || volume === 0 ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : volume < 0.5 ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          <div
            style={{
              position: 'relative',
              height: 4,
              width: isHoveringVolume ? 50 : 0,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              transition: 'width 0.2s ease',
              overflow: isHoveringVolume ? 'visible' : 'hidden',
              opacity: isHoveringVolume ? 1 : 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${muted ? 0 : volume * 100}%`,
                background: ACCENT,
                borderRadius: 2,
                pointerEvents: 'none',
              }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              style={{
                position: 'absolute',
                top: -5,
                left: 0,
                width: '100%',
                height: 14,
                opacity: 0,
                cursor: 'pointer',
                margin: 0,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          <button
            type="button"
            onClick={() => void changeTrack(-1)}
            aria-label="Previous track"
            title="Previous track"
            style={controlButton}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            style={{
              width: 52,
              height: 52,
              background: ACCENT,
              color: BACKGROUND,
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.1s ease',
            }}
          >
            {isPlaying ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginLeft: 4 }}
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => void changeTrack(1)}
            aria-label="Next track"
            title="Next track"
            style={controlButton}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <button
            type="button"
            onClick={reshuffle}
            aria-label="Shuffle"
            aria-pressed={true}
            title="Shuffle on — click to reshuffle"
            style={{
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              border: `1px solid ${ACCENT}`,
              background: 'rgba(0,218,90,0.16)',
              color: ACCENT,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
          >
            <Shuffle size={15} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={handleSpeedToggle}
            aria-label="Playback speed"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              width: 42,
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {playbackRate}x
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => {
          if (isSeeking) return;
          const current = event.currentTarget.currentTime;
          const total = event.currentTarget.duration;
          setPlayedSeconds(current);
          setPlayedRatio(total > 0 ? current / total : 0);
        }}
        onPlay={() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
        }}
        onPause={() => {
          isPlayingRef.current = false;
          setIsPlaying(false);
        }}
        onEnded={() => void changeTrack(1, true)}
      />
    </div>
  );
};

export default ProAudioPlayer;
