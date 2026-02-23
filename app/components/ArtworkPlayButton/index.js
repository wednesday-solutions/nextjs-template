import React from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { ArtworkWrapper, Artwork, PlayOverlay } from '@components/styled/artworkPlayButton';

const ArtworkPlayButton = ({ src, alt, isPlaying, isActive, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <ArtworkWrapper onClick={handleClick} data-testid="artwork-play-btn">
      <Artwork src={src} alt={alt} />
      <PlayOverlay isActive={isActive} data-overlay data-testid="play-overlay">
        {isActive && isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
      </PlayOverlay>
    </ArtworkWrapper>
  );
};

ArtworkPlayButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ArtworkPlayButton;
