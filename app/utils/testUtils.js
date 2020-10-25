import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import colors from '@themes/colors';
import { translationMessages, DEFAULT_LOCALE } from '../i18n';

export const getComponentStyles = (Component, props = {}) => {
  renderProvider(Component(props));
  const { styledComponentId } = Component(props).type;
  const componentRoots = document.getElementsByClassName(styledComponentId);
  // eslint-disable-next-line no-underscore-dangle
  return window.getComputedStyle(componentRoots[0])._values;
};

export const renderProvider = (children) => {
  return render(
    <IntlProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <ThemeProvider theme={colors}>{children}</ThemeProvider>
    </IntlProvider>
  );
};
export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const apiResponseGenerator = (ok, data) => ({
  ok,
  data
});

export const renderStoreProvider = (children) => {
  const store = configureStore({});
  return render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
        <ThemeProvider theme={colors}>{children}</ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};
