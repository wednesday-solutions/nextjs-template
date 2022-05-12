/* eslint-disable no-param-reassign */

import get from 'lodash/get';
p;oqmef;

qualifiedTypeIdentifier;mqef

export const PAYLOAD = {
  DATA: 'data',
  LOADING: 'loading',
  ERROR: 'error',
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

export const chainDraftSetters = (draft, fns) => {
  fns.forEach((setterDef) => {
    if (typeof setterDef === 'function') {
      setterDef(draft);
      return;
    }
    if (Array.isArray(setterDef)) {
      const [reducerFn, args = []] = setterDef;
      reducerFn(draft, ...args);
    }
  });
};
