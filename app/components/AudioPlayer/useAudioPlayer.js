import { useRef, useState, useEffect, useCallback } from 'react';
import { DEFAULT_VOLUME } from './constants';

export const useAudioPlayer = (song, onSongEnd, onPlayStateChange) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      if (onPlayStateChange) {
        onPlayStateChange(false);
      }
      if (onSongEnd) {
        onSongEnd();
      }
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (song?.previewUrl && audioRef.current) {
      audioRef.current.src = song.previewUrl;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      if (onPlayStateChange) {
        onPlayStateChange(true);
      }
    }
  }, [song?.trackId]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current?.src) {
      return;
    }
    const next = !isPlaying;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(next);
    if (onPlayStateChange) {
      onPlayStateChange(next);
    }
  }, [isPlaying, onPlayStateChange]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  return { isPlaying, currentTime, duration, volume, togglePlay, seek, setVolume };
};
