export const startLoading = (draft) => draft.set('loading', true);
export const stopLoading = (draft) => draft.set('loading', false);
export const setData = (draft, data) => draft.set('data', data);

const handleMethods = (previousDraft, reducer) => {
  if (previousDraft === undefined) {
    // eslint-disable-next-line no-console
    console.warn('Draft is undefined!, Check the setter.');
  }
  if (Array.isArray(reducer)) {
    const [reducerFn, args] = reducer;
    return reducerFn(previousDraft, args);
  }
  return reducer(previousDraft);
};
export const chainMethods = (draft, fns) => fns.reduce(handleMethods, draft);
