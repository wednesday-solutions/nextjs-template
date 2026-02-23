import { PAYLOAD, startLoading, stopLoading, setError } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { LIBRARY_PAYLOAD } from './constants';

export const initialState = {
  [LIBRARY_PAYLOAD.LIKED_SONGS]: [],
  [LIBRARY_PAYLOAD.LIKED_TRACK_IDS]: {},
  [PAYLOAD.ERROR]: null,
  [PAYLOAD.LOADING]: false
};

export const { Types: libraryTypes, Creators: libraryCreators } = createActions({
  requestFetchLibrary: null,
  successFetchLibrary: [PAYLOAD.DATA],
  failureFetchLibrary: [PAYLOAD.ERROR],
  requestLikeSong: [LIBRARY_PAYLOAD.SONG_DATA],
  successLikeSong: [LIBRARY_PAYLOAD.SONG_DATA],
  failureLikeSong: [PAYLOAD.ERROR],
  requestUnlikeSong: [LIBRARY_PAYLOAD.TRACK_ID],
  successUnlikeSong: [LIBRARY_PAYLOAD.TRACK_ID],
  failureUnlikeSong: [PAYLOAD.ERROR],
  clearLibrary: null
});

const buildTrackIdMap = (songs) => {
  const map = {};
  songs.forEach((s) => {
    map[s.trackId] = true;
  });
  return map;
};

const handleFetchRequest = (draft) => {
  startLoading(draft);
  draft[PAYLOAD.ERROR] = null;
};

const handleFetchSuccess = (draft, action) => {
  stopLoading(draft);
  const songs = action[PAYLOAD.DATA] || [];
  draft[LIBRARY_PAYLOAD.LIKED_SONGS] = songs;
  draft[LIBRARY_PAYLOAD.LIKED_TRACK_IDS] = buildTrackIdMap(songs);
};

const handleFetchFailure = (draft, action) => {
  stopLoading(draft);
  setError(draft, action);
};

const handleLikeSuccess = (draft, action) => {
  const song = action[LIBRARY_PAYLOAD.SONG_DATA];
  draft[LIBRARY_PAYLOAD.LIKED_SONGS].push(song);
  draft[LIBRARY_PAYLOAD.LIKED_TRACK_IDS][song.trackId] = true;
};

const handleUnlikeSuccess = (draft, action) => {
  const trackId = action[LIBRARY_PAYLOAD.TRACK_ID];
  draft[LIBRARY_PAYLOAD.LIKED_SONGS] = draft[LIBRARY_PAYLOAD.LIKED_SONGS].filter((s) => s.trackId !== trackId);
  delete draft[LIBRARY_PAYLOAD.LIKED_TRACK_IDS][trackId];
};

const handlers = {
  [libraryTypes.REQUEST_FETCH_LIBRARY]: handleFetchRequest,
  [libraryTypes.SUCCESS_FETCH_LIBRARY]: handleFetchSuccess,
  [libraryTypes.FAILURE_FETCH_LIBRARY]: handleFetchFailure,
  [libraryTypes.SUCCESS_LIKE_SONG]: handleLikeSuccess,
  [libraryTypes.FAILURE_LIKE_SONG]: handleFetchFailure,
  [libraryTypes.SUCCESS_UNLIKE_SONG]: handleUnlikeSuccess,
  [libraryTypes.FAILURE_UNLIKE_SONG]: handleFetchFailure,
  [libraryTypes.CLEAR_LIBRARY]: () => initialState
};

export const libraryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const handler = handlers[action.type];
    return handler ? handler(draft, action) : state;
  });

export default libraryReducer;
