import pickBy from 'lodash/pickBy';
import { screenSizes } from '@themes/media';

/**
 * Get query string value
 * @param {array} keys - The keys to get the value of
 * @returns {object} - The query string value
 */
export function getQueryStringValue(keys) {
  const queryString = {};
  try {
    keys.forEach((key) => {
      queryString[key] = decodeURIComponent(
        window.location.search.replace(
          new RegExp(`^(?:.*[&\\?]${encodeURIComponent(key).replace(/[.+*]/g, '\\$&')}(?:\\=([^&]*))?)?.*$`, 'i'),
          '$1'
        )
      );
    });

    return pickBy(queryString);
  } catch (error) {
    return null;
  }
}

/* eslint-disable complexity */
export const mapKeysDeep = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map((val) => mapKeysDeep(val, fn))
    : typeof obj === 'object'
      ? Object.keys(obj).reduce((acc, current) => {
          const key = fn(current);
          const val = obj[current];
          acc[key] = val !== null && typeof val === 'object' ? mapKeysDeep(val, fn) : val;
          return acc;
        }, {})
      : obj;

export const setDeviceType = (width = document.body.clientWidth) => {
  if (width >= screenSizes.mobile && width < screenSizes.tablet) {
    return 'mobile';
  } else if (width >= screenSizes.tablet && width < screenSizes.desktop) {
    return 'tablet';
  }
  return 'desktop';
};

export const getDeviceType = (device) => (device || setDeviceType()).toUpperCase();
