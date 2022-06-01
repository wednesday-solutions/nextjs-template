import get from 'lodash/get';

export const PAYLOAD = {
  DATA: 'data',
  LOADING: 'loading',
  ERROR: 'error'
};
export const startLoading = (draft) => {
  draft[PAYLOAD.LOADING] = true;
};

export const stopLoading = (draft) => {
  draft[PAYLOAD.LOADING] = false;
};

export const setData = (draft, action, key = PAYLOAD.DATA, defaultValue = null) => {
  draft[key] = get(action, key, defaultValue);
};

export const setError = (draft, action) => {
  setData(draft, action, PAYLOAD.ERROR, 'something_went_wrong');
};
