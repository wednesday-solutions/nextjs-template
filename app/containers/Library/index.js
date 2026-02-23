import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '@utils/injectSaga';
import SongList from '@components/SongList';
import AudioPlayer from '@components/AudioPlayer';
import If from '@components/If';
import ThemeToggle from '@components/ThemeToggle';
import LogoutButton from '@components/LogoutButton';
import NavLink from '@components/NavLink';
import {
  MusicPageWrapper,
  MusicPageContent,
  PageHeader,
  PageTitle,
  HeaderActions,
  EmptyState,
  LoadingSpinner
} from '@components/styled/musicPage';
import { NavGroup } from '@components/styled/navLink';
import { musicCreators } from '@app/containers/Music/reducer';
import { libraryCreators } from './reducer';
import saga from './saga';
import musicSaga from '@app/containers/Music/saga';
import { selectLikedSongs, selectLikedTrackIds, selectLibraryLoading } from './selectors';
import { selectCurrentSong, selectIsPlaying } from '@app/containers/Music/selectors';
import usePlaybackNav from '@app/containers/Music/usePlaybackNav';
import useToggleLike from '@app/containers/Music/useToggleLike';
import usePlayToggle from '@app/containers/Music/usePlayToggle';

export function Library(props) {
  const { likedSongs, likedTrackIds, loading, currentSong, isPlaying } = props;
  const { dispatchFetchLibrary, dispatchSetSong, dispatchLike, dispatchUnlike, dispatchSetIsPlaying } = props;

  useEffect(() => {
    dispatchFetchLibrary();
  }, []);

  const { handleNext, handlePrev } = usePlaybackNav({ songs: likedSongs, currentSong, dispatchSetSong });
  const handleToggleLike = useToggleLike({ likedTrackIds, dispatchLike, dispatchUnlike });
  const { handlePlayToggle, registerTogglePlay } = usePlayToggle({ currentSong, dispatchSetSong });

  return (
    <MusicPageWrapper>
      <PageHeader>
        <PageTitle>MUSICA</PageTitle>
        <NavGroup>
          <NavLink href="/" label="Search" />
          <NavLink href="/library" label="Favorites" isActive />
        </NavGroup>
        <HeaderActions>
          <ThemeToggle />
          <LogoutButton />
        </HeaderActions>
      </PageHeader>
      <MusicPageContent>
        <If condition={loading}>
          <LoadingSpinner data-testid="loading-spinner" />
        </If>
        <If condition={!loading && likedSongs.length > 0}>
          <SongList
            songs={likedSongs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayToggle={handlePlayToggle}
            likedTrackIds={likedTrackIds}
            onToggleLike={handleToggleLike}
          />
        </If>
        <If condition={!loading && likedSongs.length === 0}>
          <EmptyState data-testid="empty-library">
            No liked songs yet. Search and like songs to build your library.
          </EmptyState>
        </If>
      </MusicPageContent>
      <AudioPlayer
        currentSong={currentSong}
        onNext={handleNext}
        onPrev={handlePrev}
        onPlayStateChange={dispatchSetIsPlaying}
        onRegisterToggle={registerTogglePlay}
      />
    </MusicPageWrapper>
  );
}

Library.propTypes = {
  likedSongs: PropTypes.array,
  likedTrackIds: PropTypes.object,
  loading: PropTypes.bool,
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool,
  dispatchFetchLibrary: PropTypes.func.isRequired,
  dispatchSetSong: PropTypes.func.isRequired,
  dispatchLike: PropTypes.func.isRequired,
  dispatchUnlike: PropTypes.func.isRequired,
  dispatchSetIsPlaying: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  likedSongs: selectLikedSongs(),
  likedTrackIds: selectLikedTrackIds(),
  loading: selectLibraryLoading(),
  currentSong: selectCurrentSong(),
  isPlaying: selectIsPlaying()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchLibrary: () => dispatch(libraryCreators.requestFetchLibrary()),
    dispatchSetSong: (song) => dispatch(musicCreators.setCurrentSong(song)),
    dispatchSetIsPlaying: (val) => dispatch(musicCreators.setIsPlaying(val)),
    dispatchLike: (song) => dispatch(libraryCreators.requestLikeSong(song)),
    dispatchUnlike: (id) => dispatch(libraryCreators.requestUnlikeSong(id))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSaga({ key: 'library', saga }),
  injectSaga({ key: 'music', saga: musicSaga })
)(Library);

export const LibraryTest = Library;
