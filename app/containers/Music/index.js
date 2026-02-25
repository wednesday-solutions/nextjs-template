import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash/debounce';
import injectSaga from '@utils/injectSaga';
import SearchBar from '@components/SearchBar';
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
import { musicCreators } from './reducer';
import { libraryCreators } from '@app/containers/Library/reducer';
import saga from './saga';
import librarySaga from '@app/containers/Library/saga';
import { selectMusicSongs, selectMusicLoading, selectCurrentSong } from './selectors';
import { selectLikedTrackIds } from '@app/containers/Library/selectors';
import { SEARCH_DEBOUNCE_MS } from './constants';
import usePlaybackNav from './usePlaybackNav';
import useToggleLike from './useToggleLike';

export function Music(props) {
  const { songs, loading, currentSong, dispatchSearch, dispatchSetSong } = props;
  const { likedTrackIds, dispatchFetchLibrary, dispatchLike, dispatchUnlike } = props;
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatchFetchLibrary();
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => dispatchSearch(term), SEARCH_DEBOUNCE_MS),
    []
  );
  const handleSearch = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };
  const { handleNext, handlePrev } = usePlaybackNav({ songs, currentSong, dispatchSetSong });
  const handleToggleLike = useToggleLike({ likedTrackIds, dispatchLike, dispatchUnlike });

  return (
    <MusicPageWrapper>
      <MusicPageContent>
        <PageHeader>
          <PageTitle>MUSICA</PageTitle>
          <NavGroup>
            <NavLink href="/" label="Search" isActive />
            <NavLink href="/library" label="Favorites" />
          </NavGroup>
          <HeaderActions>
            <ThemeToggle />
            <LogoutButton />
          </HeaderActions>
        </PageHeader>
        <SearchBar value={searchValue} onChange={handleSearch} loading={loading} />
        <If condition={loading}>
          <LoadingSpinner data-testid="loading-spinner" />
        </If>
        <If condition={!loading && songs.length > 0}>
          <SongList
            songs={songs}
            currentSong={currentSong}
            onSelectSong={dispatchSetSong}
            likedTrackIds={likedTrackIds}
            onToggleLike={handleToggleLike}
          />
        </If>
        <If condition={!loading && songs.length === 0 && searchValue.length > 0}>
          <EmptyState data-testid="empty-state">No songs found. Try a different search.</EmptyState>
        </If>
      </MusicPageContent>
      <AudioPlayer currentSong={currentSong} onNext={handleNext} onPrev={handlePrev} />
    </MusicPageWrapper>
  );
}

Music.propTypes = {
  songs: PropTypes.array,
  loading: PropTypes.bool,
  currentSong: PropTypes.object,
  likedTrackIds: PropTypes.object,
  dispatchSearch: PropTypes.func.isRequired,
  dispatchSetSong: PropTypes.func.isRequired,
  dispatchFetchLibrary: PropTypes.func.isRequired,
  dispatchLike: PropTypes.func.isRequired,
  dispatchUnlike: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  songs: selectMusicSongs(),
  loading: selectMusicLoading(),
  currentSong: selectCurrentSong(),
  likedTrackIds: selectLikedTrackIds()
});

function mapDispatchToProps(dispatch) {
  const { requestSearchSongs, setCurrentSong } = musicCreators;
  const { requestFetchLibrary, requestLikeSong, requestUnlikeSong } = libraryCreators;
  return {
    dispatchSearch: (term) => dispatch(requestSearchSongs(term)),
    dispatchSetSong: (song) => dispatch(setCurrentSong(song)),
    dispatchFetchLibrary: () => dispatch(requestFetchLibrary()),
    dispatchLike: (song) => dispatch(requestLikeSong(song)),
    dispatchUnlike: (id) => dispatch(requestUnlikeSong(id))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'music', saga }),
  injectSaga({ key: 'library', saga: librarySaga })
)(Music);

export const MusicTest = Music;
