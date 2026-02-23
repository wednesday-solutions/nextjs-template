import { DEFAULT_VOLUME } from './constants';

let audioInstance = null;

export const getAudioInstance = () => {
  if (!audioInstance) {
    audioInstance = new Audio();
    audioInstance.volume = DEFAULT_VOLUME;
  }
  return audioInstance;
};
