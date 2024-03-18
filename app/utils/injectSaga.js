import React, { useContext, useEffect } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';
import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
const withSaga =
  ({ key, saga, mode }) =>
  (WrappedComponent) => {
    const InjectSaga = (props) => {
      const { store } = useContext(ReactReduxContext);
      const injectors = getInjectors(store);

      useEffect(() => {
        injectors.injectSaga(key, { saga, mode }, props);
        return () => {
          injectors.ejectSaga(key);
        };
      }, []);

      return <WrappedComponent {...props} />;
    };

    InjectSaga.WrappedComponent = WrappedComponent;
    InjectSaga.displayName = `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };

const useInjectSaga = ({ key, saga, mode }) => {
  const { store } = useContext(ReactReduxContext);
  const injectors = getInjectors(store);

  useEffect(() => {
    injectors.injectSaga(key, { saga, mode });
    return () => {
      injectors.ejectSaga(key);
    };
  }, []);
};

export default { withSaga, useInjectSaga };
