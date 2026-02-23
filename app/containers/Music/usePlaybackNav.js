import { useCallback } from 'react';

const usePlaybackNav = ({ songs, currentSong, dispatchSetSong }) => {
  const findIdx = useCallback(() => songs.findIndex((s) => s.trackId === currentSong?.trackId), [songs, currentSong]);

  const handleNext = useCallback(() => {
    const idx = findIdx();
    if (idx < songs.length - 1) {
      dispatchSetSong(songs[idx + 1]);
    }
  }, [songs, findIdx, dispatchSetSong]);

  const handlePrev = useCallback(() => {
    const idx = findIdx();
    if (idx > 0) {
      dispatchSetSong(songs[idx - 1]);
    }
  }, [findIdx, dispatchSetSong]);

  return { handleNext, handlePrev };
};

export default usePlaybackNav;
