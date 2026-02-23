import { useRef, useCallback } from 'react';

const usePlayToggle = ({ currentSong, dispatchSetSong }) => {
  const togglePlayRef = useRef(null);

  const registerTogglePlay = useCallback((fn) => {
    togglePlayRef.current = fn;
  }, []);

  const handlePlayToggle = useCallback(
    (song) => {
      if (currentSong?.trackId === song.trackId) {
        if (togglePlayRef.current) {
          togglePlayRef.current();
        }
      } else {
        dispatchSetSong(song);
      }
    },
    [currentSong, dispatchSetSong]
  );

  return { handlePlayToggle, registerTogglePlay };
};

export default usePlayToggle;
