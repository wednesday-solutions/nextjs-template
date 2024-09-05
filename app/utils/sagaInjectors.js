import invariant from 'invariant';
import { isEmpty, isFunction, isString, conformsTo } from 'lodash';

import checkStore from './checkStore';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key) =>
  invariant(isString(key) && !isEmpty(key), '(app/utils...) injectSaga: Expected `key` to be a non empty string');

const checkDescriptor = (descriptor) => {
  const shape = {
    saga: isFunction,
    mode: (mode) => isString(mode) && allowedModes.includes(mode)
  };
  invariant(conformsTo(descriptor, shape), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

/**
 * Validate the saga, mode and key
 * @param {object} descriptor The saga descriptor
 * @param {string} key The saga key
 * @param {object} saga The saga
 */
export function injectSagaFactory(store, isValid) {
  const updateHasSagaInDevelopment = (hasSaga, key, saga) => {
    const oldDescriptor = store.injectedSagas[key];
    // enable hot reloading of daemon and once-till-unmount sagas
    if (hasSaga && oldDescriptor.saga !== saga) {
      oldDescriptor.task.cancel();
      return false;
    }
    return hasSaga;
  };

  const updateStoreInjectors = (newDescriptor, saga, key, args) => {
    store.injectedSagas[key] = {
      ...newDescriptor,
      task: store.runSaga(saga, args)
    };
  };

  const checkAndUpdateStoreInjectors = (hasSaga, key, newDescriptor, args) => {
    if (!hasSaga || (hasSaga && newDescriptor.mode !== DAEMON && newDescriptor.mode !== ONCE_TILL_UNMOUNT)) {
      updateStoreInjectors(newDescriptor, newDescriptor.saga, key, args);
    }
  };

  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) {
      checkStore(store);
    }

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON
    };

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      hasSaga = updateHasSagaInDevelopment(hasSaga, key, newDescriptor.saga);
    }

    checkAndUpdateStoreInjectors(hasSaga, key, newDescriptor, args);

    return key;
  };
}

/**
 * Eject the saga
 * @param {string} key The saga key
 * @param {object} store The redux store
 * @param {boolean} isValid If the store is valid
 */
export function ejectSagaFactory(store, isValid) {
  /**
   * Clean up the store
   * @param {string} key The saga key
   * @returns {void}
   */
  function updateStoreSaga(key) {
    // Clean up in production; in development we need `descriptor.saga` for hot reloading
    if (process.env.NODE_ENV === 'production') {
      // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
      store.injectedSagas[key] = 'done';
    }
  }

  return function ejectSaga(key) {
    if (!isValid) {
      checkStore(store);
    }

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode === DAEMON) {
        return;
      }

      descriptor.task.cancel();
      updateStoreSaga(key);
    }
  };
}

/**
 * Get the injectors
 * @param {object} store The redux store
 */
export default function getInjectors(store) {
  checkStore(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}
