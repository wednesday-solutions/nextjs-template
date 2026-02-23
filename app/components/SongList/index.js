import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import HeartButton from '@components/HeartButton';
import ArtworkPlayButton from '@components/ArtworkPlayButton';
import If from '@components/If';
import { SongListWrapper, SongCard, SongInfo, SongTitle, SongArtist, SongAlbum } from '@components/styled/songList';

const SongList = ({ songs, currentSong, isPlaying, onPlayToggle, likedTrackIds, onToggleLike }) => {
  const router = useRouter();

  const handleCardClick = (song) => {
    router.push(`/track/${song.trackId}`);
  };

  return (
    <SongListWrapper data-testid="song-list">
      {songs.map((song) => {
        const isActive = currentSong?.trackId === song.trackId;
        return (
          <SongCard
            key={song.trackId}
            data-testid={`song-${song.trackId}`}
            isActive={isActive}
            onClick={() => handleCardClick(song)}
          >
            <ArtworkPlayButton
              src={song.artworkUrl}
              alt={song.trackName}
              isActive={isActive}
              isPlaying={isActive && isPlaying}
              onClick={() => onPlayToggle(song)}
            />
            <SongInfo>
              <SongTitle>{song.trackName}</SongTitle>
              <SongArtist>{song.artistName}</SongArtist>
              <SongAlbum>{song.albumName}</SongAlbum>
            </SongInfo>
            <If condition={!!onToggleLike}>
              <HeartButton isLiked={!!likedTrackIds[song.trackId]} onClick={() => onToggleLike(song)} />
            </If>
          </SongCard>
        );
      })}
    </SongListWrapper>
  );
};

SongList.propTypes = {
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool,
  onPlayToggle: PropTypes.func.isRequired,
  likedTrackIds: PropTypes.object,
  onToggleLike: PropTypes.func
};

SongList.defaultProps = {
  isPlaying: false,
  likedTrackIds: {},
  onToggleLike: null
};

export default SongList;
