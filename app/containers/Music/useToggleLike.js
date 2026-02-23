import { useCallback } from 'react';

const useToggleLike = ({ likedTrackIds, dispatchLike, dispatchUnlike }) => {
  const handleToggleLike = useCallback(
    (song) => {
      if (likedTrackIds[song.trackId]) {
        dispatchUnlike(song.trackId);
      } else {
        dispatchLike(song);
      }
    },
    [likedTrackIds, dispatchLike, dispatchUnlike]
  );

  return handleToggleLike;
};

export default useToggleLike;
