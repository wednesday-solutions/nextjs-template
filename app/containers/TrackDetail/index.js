import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';
import injectSaga from '@utils/injectSaga';
import AudioPlayer from '@components/AudioPlayer';
import If from '@components/If';
import BackButton from '@components/BackButton';
import TrackInfo from '@components/TrackInfo';
import {
  MusicPageWrapper,
  MusicPageContent,
  PageHeader,
  PageTitle,
  LoadingSpinner,
  EmptyState
} from '@components/styled/musicPage';
import { trackDetailCreators } from './reducer';
import { musicCreators } from '@app/containers/Music/reducer';
import { selectTrackData, selectTrackDetailLoading, selectTrackDetailError } from './selectors';
import { selectCurrentSong } from '@app/containers/Music/selectors';
import saga from './saga';

export function TrackDetail(props) {
  const { trackData, loading, error, currentSong } = props;
  const { dispatchFetchTrack, dispatchSetSong, dispatchSetIsPlaying } = props;
  const router = useRouter();
  const { trackId } = router.query;

  useEffect(() => {
    if (trackId) {
      dispatchFetchTrack(Number(trackId));
    }
  }, [trackId]);

  const handlePlay = () => {
    if (trackData) {
      dispatchSetSong(trackData);
    }
  };

  const noop = () => {};

  return (
    <MusicPageWrapper>
      <PageHeader>
        <BackButton onClick={() => router.back()} />
        <PageTitle>MUSICA</PageTitle>
        <div />
      </PageHeader>
      <MusicPageContent>
        <If condition={loading}>
          <LoadingSpinner data-testid="loading-spinner" />
        </If>
        <If condition={!!error}>
          <EmptyState data-testid="error-state">Failed to load track details.</EmptyState>
        </If>
        <If condition={!loading && !error && !!trackData}>
          <TrackInfo track={trackData || {}} onPlay={handlePlay} />
        </If>
      </MusicPageContent>
      <AudioPlayer currentSong={currentSong} onNext={noop} onPrev={noop} onPlayStateChange={dispatchSetIsPlaying} />
    </MusicPageWrapper>
  );
}

TrackDetail.propTypes = {
  trackData: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  currentSong: PropTypes.object,
  dispatchFetchTrack: PropTypes.func.isRequired,
  dispatchSetSong: PropTypes.func.isRequired,
  dispatchSetIsPlaying: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  trackData: selectTrackData(),
  loading: selectTrackDetailLoading(),
  error: selectTrackDetailError(),
  currentSong: selectCurrentSong()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchTrack: (id) => dispatch(trackDetailCreators.requestTrackDetail(id)),
    dispatchSetSong: (song) => dispatch(musicCreators.setCurrentSong(song)),
    dispatchSetIsPlaying: (val) => dispatch(musicCreators.setIsPlaying(val))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'trackDetail', saga }))(TrackDetail);

export const TrackDetailTest = TrackDetail;
