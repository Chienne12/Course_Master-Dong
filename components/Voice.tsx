import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './UI';

type VoiceSide = 'left' | 'right';

interface VoiceContextValue {
  autoPlayEnabled: boolean;
  hasUserGesture: boolean;
  isPlaying: boolean;
  playingId: string | null;
  toggleAutoPlay: () => void;
  play: (id: string, src: string) => Promise<void>;
  toggle: (id: string, src?: string) => Promise<void>;
  stop: (id?: string) => void;
}

const VoiceContext = createContext<VoiceContextValue | null>(null);

const resolveUrl = (src: string) => new URL(src, window.location.href).toString();

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [hasUserGesture, setHasUserGesture] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setPlayingId(null);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, []);

  const stop = useCallback(
    (id?: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (id && playingId !== id) return;

      audio.pause();
      try {
        audio.currentTime = 0;
      } catch {
        // ignore
      }
      setPlayingId(null);
    },
    [playingId],
  );

  const play = useCallback(async (id: string, src: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasUserGesture(true);

    const resolvedSrc = resolveUrl(src);
    if (audio.src !== resolvedSrc) {
      audio.src = resolvedSrc;
    }

    try {
      audio.currentTime = 0;
    } catch {
      // ignore
    }

    setPlayingId(id);
    try {
      await audio.play();
    } catch (error) {
      // Most commonly blocked autoplay; fall back to manual click.
      console.warn('Audio play blocked/failed:', error);
      setPlayingId(null);
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(
    async (id: string, src?: string) => {
      const audio = audioRef.current;
      if (!audio || !src) return;

      setHasUserGesture(true);

      if (playingId === id && !audio.paused) {
        audio.pause();
        return;
      }

      await play(id, src);
    },
    [play, playingId],
  );

  const toggleAutoPlay = useCallback(() => {
    setHasUserGesture(true);
    setAutoPlayEnabled((prev) => {
      const next = !prev;
      if (!next) stop();
      return next;
    });
  }, [stop]);

  const value = useMemo<VoiceContextValue>(
    () => ({
      autoPlayEnabled,
      hasUserGesture,
      isPlaying,
      playingId,
      toggleAutoPlay,
      play,
      toggle,
      stop,
    }),
    [autoPlayEnabled, hasUserGesture, isPlaying, playingId, toggleAutoPlay, play, toggle, stop],
  );

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
};

export const useVoice = () => {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error('useVoice must be used within VoiceProvider');
  return ctx;
};

export const VoiceToggleButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { autoPlayEnabled, toggleAutoPlay } = useVoice();

  return (
    <button
      type="button"
      onClick={toggleAutoPlay}
      className={`hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
        autoPlayEnabled
          ? 'bg-primary/10 text-primary border-primary/30'
          : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
      } ${className}`}
      title={autoPlayEnabled ? 'Tự phát giọng: Bật' : 'Tự phát giọng: Tắt'}
      aria-pressed={autoPlayEnabled}
    >
      <Icon name={autoPlayEnabled ? 'volume_up' : 'volume_off'} className="text-[18px]" />
      <span>Giọng</span>
    </button>
  );
};

export const VoicePage: React.FC<{
  id: string;
  src?: string;
  side: VoiceSide;
  children: React.ReactNode;
}> = ({ id, src, side, children }) => {
  const { autoPlayEnabled, hasUserGesture, isPlaying, playingId, play, toggle, stop } = useVoice();
  const isThisPlaying = playingId === id && isPlaying;
  const canPlay = Boolean(src);

  // Stop if this page unmounts while its audio is playing.
  useEffect(() => () => stop(id), [id, stop]);

  // Autoplay: only for right page to avoid double audio.
  useEffect(() => {
    if (!autoPlayEnabled) return;
    if (!hasUserGesture) return;
    if (side !== 'right') return;
    if (!src) return;

    const t = window.setTimeout(() => {
      play(id, src);
    }, 220);

    return () => window.clearTimeout(t);
  }, [autoPlayEnabled, hasUserGesture, id, src, side, play]);

  const iconName = !canPlay ? 'volume_off' : isThisPlaying ? 'graphic_eq' : 'volume_up';

  return (
    <div className="relative w-full h-full group">
      <button
        type="button"
        onClick={() => toggle(id, src)}
        disabled={!canPlay}
        className={`absolute top-3 ${side === 'left' ? 'left-3' : 'right-3'} z-50 w-8 h-8 rounded-full flex items-center justify-center bg-transparent transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50 ${
          canPlay
            ? 'opacity-35 group-hover:opacity-60 hover:opacity-95 active:opacity-95'
            : 'opacity-15 cursor-not-allowed'
        }`}
        title={canPlay ? (isThisPlaying ? 'Tạm dừng giọng nói' : 'Nghe giọng nói') : 'Chưa có giọng cho trang này'}
        aria-label={canPlay ? (isThisPlaying ? 'Tạm dừng giọng nói' : 'Nghe giọng nói') : 'Chưa có giọng cho trang này'}
      >
        <Icon
          name={iconName}
          className={`text-[18px] leading-none select-none ${
            isThisPlaying ? 'text-primary' : 'text-white/90 mix-blend-difference'
          }`}
        />
      </button>
      {side === 'right' && (
        <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none z-20 mix-blend-multiply" />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
