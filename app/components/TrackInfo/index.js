import React from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '@utils/formatDuration';
import {
  TrackDetailWrapper,
  TrackArtworkLarge,
  TrackMeta,
  TrackDetailName,
  TrackDetailArtist,
  TrackDetailAlbum,
  TagRow,
  Tag,
  StoreLink
} from '@components/styled/trackInfo';

const TrackInfo = ({ track }) => (
  <TrackDetailWrapper data-testid="track-info">
    <TrackArtworkLarge src={track.artworkUrl} alt={track.trackName} />
    <TrackMeta>
      <TrackDetailName>{track.trackName}</TrackDetailName>
      <TrackDetailArtist>{track.artistName}</TrackDetailArtist>
      <TrackDetailAlbum>{track.albumName}</TrackDetailAlbum>
    </TrackMeta>
    <TagRow>
      {<Tag data-testid="tag-genre">{track.genre}</Tag>}
      {track.durationMs && <Tag data-testid="tag-duration">{formatDuration(track.durationMs)}</Tag>}
      {track.releaseDate && <Tag data-testid="tag-release">{new Date(track.releaseDate).getFullYear()}</Tag>}
      {track.trackPrice && (
        <Tag data-testid="tag-price">
          {track.currency} {track.trackPrice}
        </Tag>
      )}
    </TagRow>
    {track.trackUrl && (
      <StoreLink href={track.trackUrl} target="_blank" rel="noopener noreferrer" data-testid="store-link">
        Open in Store
      </StoreLink>
    )}
  </TrackDetailWrapper>
);

TrackInfo.propTypes = {
  track: PropTypes.object.isRequired
};

export default TrackInfo;
