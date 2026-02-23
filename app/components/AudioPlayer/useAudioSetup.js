import { useRef, useState, useEffect } from 'react';
import { getAudioInstance } from './audioSingleton';

export const useAudioSetup = (onSongEnd, onPlayStateChange) => {
  const audio = getAudioInstance();
  const audioRef = useRef(audio);
  const [isPlaying, setIsPlaying] = useState(!audio.paused);
  const [currentTime, setCurrentTime] = useState(audio.currentTime || 0);
  const [duration, setDuration] = useState(audio.duration || 0);
  const [volume, setVolumeState] = useState(audio.volume);

  useEffect(() => {
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
      onSongEnd?.();
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  return { audioRef, isPlaying, setIsPlaying, currentTime, duration, volume, setVolumeState };
};
