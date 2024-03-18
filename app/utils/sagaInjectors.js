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

function shouldInjectSaga(store, key, newDescriptor) {
  const hasSaga = Reflect.has(store.injectedSagas, key);

  if (!hasSaga) {
    return true;
  }

  if (process.env.NODE_ENV !== 'production') {
    return shouldCancelOldSaga(store, key, newDescriptor);
  }

  return newDescriptor.mode !== DAEMON && newDescriptor.mode !== ONCE_TILL_UNMOUNT;
}

function shouldCancelOldSaga(store, key, newDescriptor) {
  const oldDescriptor = store.injectedSagas[key];
  if (oldDescriptor.saga !== newDescriptor.saga) {
    oldDescriptor.task.cancel();
    return false;
  }
  return true;
}

function runSaga(store, { key, descriptor, args }) {
  store.injectedSagas[key] = {
    ...descriptor,
    task: store.runSaga(descriptor.saga, args)
  };
}

export function injectSagaFactory(store, isValid) {
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

    if (shouldInjectSaga(store, key, newDescriptor)) {
      runSaga(store, { key, descriptor: newDescriptor, args });
    }
  };
}

function cancelSaga(task) {
  task.cancel();
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) {
      checkStore(store);
    }

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        cancelSaga(descriptor.task);
        if (process.env.NODE_ENV === 'production') {
          store.injectedSagas[key] = 'done';
        }
      }
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}
