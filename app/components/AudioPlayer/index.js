import React from 'react';
import PropTypes from 'prop-types';
import {
  StepBackwardFilled,
  PlayCircleFilled,
  PauseCircleFilled,
  StepForwardFilled,
  SoundFilled
} from '@ant-design/icons';
import { useAudioPlayer } from './useAudioPlayer';
import {
  PlayerContainer,
  NowPlayingArt,
  PlayerTrackInfo,
  TrackTitle,
  TrackArtist,
  PlayerControls,
  ControlButton,
  ProgressSlider,
  VolumeGroup,
  VolumeSlider
} from '@components/styled/playerBar';

const AudioPlayer = ({ currentSong, onNext, onPrev }) => {
  const player = useAudioPlayer(currentSong, onNext);

  if (!currentSong) {
    return null;
  }

  return (
    <PlayerContainer data-testid="audio-player">
      <NowPlayingArt src={currentSong.artworkUrl} alt={currentSong.trackName} />
      <PlayerTrackInfo>
        <TrackTitle>{currentSong.trackName}</TrackTitle>
        <TrackArtist>{currentSong.artistName}</TrackArtist>
      </PlayerTrackInfo>
      <PlayerControls>
        <ControlButton data-testid="prev-btn" onClick={onPrev}>
          <StepBackwardFilled />
        </ControlButton>
        <ControlButton data-testid="play-btn" primary onClick={player.togglePlay}>
          {player.isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
        </ControlButton>
        <ControlButton data-testid="next-btn" onClick={onNext}>
          <StepForwardFilled />
        </ControlButton>
      </PlayerControls>
      <ProgressSlider
        data-testid="progress-slider"
        type="range"
        min={0}
        max={player.duration || 0}
        value={player.currentTime}
        onChange={(e) => player.seek(Number(e.target.value))}
        style={{ '--fill': `${player.duration ? (player.currentTime / player.duration) * 100 : 0}%` }}
      />
      <VolumeGroup>
        <SoundFilled data-testid="volume-icon" style={{ color: '#ffff', fontSize: '1rem' }} />
        <VolumeSlider
          data-testid="volume-slider"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={player.volume}
          onChange={(e) => player.setVolume(Number(e.target.value))}
          style={{ '--fill': `${player.volume * 100}%` }}
        />
      </VolumeGroup>
    </PlayerContainer>
  );
};

AudioPlayer.propTypes = {
  currentSong: PropTypes.object,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
};

export default AudioPlayer;
