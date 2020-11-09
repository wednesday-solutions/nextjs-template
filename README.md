# Next.js template

### Out of the box support

- Global state management using `redux`
- Side Effects using `redux-saga`
- API calls using `api-sauce`
- Styling using styled components
- Reusing components from Ant design
- Translations using `react-intl`
- Custom enviornments using `emv-cmd`
- Image loading using `next-images`
- IE 11 compatible

## Global state management using reduxSauce

- Global state management using [Redux Sauce](https://github.com/infinitered/reduxsauce)

  Take a look at the following files

  - [app/store/reducers/app.js](app/store/reducers/app.js)

- Computing and getting state from the redux store using [Reselect](https://github.com/reduxjs/reselect)

  Take a look at the following files

  - [app/store/selectors/app.js](app/store/selectors/app.js)

## Implementing a Redux middleware using redux-sagas

- Side effects using [Redux Saga](https://github.com/redux-saga/redux-saga)

  Take a look at the following files

  - [app/utils/injectSaga.js](app/utils/injectSaga.js)
  - [app/utils/sagaInjectors.js](app/utils/sagaInjectors.js)
  - [app/store/sagas/app.js](app/containers/HomeContainer/saga.js)
  - [pages/index.js](app/containers/HomeContainer/index.js)

## Network requests using apisauce

- API calls using [Api Sauce](https://github.com/infinitered/apisauce/)

  Take a look at the following files

  - [app/utils/apiUtils.js](app/utils/apiUtils.js)
  - [app/services/repoApi.js](app/services/repoApi.js)
  - [pages/index.js](pages/index.js)

## Styling using styled-components

- Styling components using [Styled Components](https://styled-components.com)

  Take a look at the following files

  - [app/components/Text/index.js](app/components/Text/index.js)
  - [pages/index.js](pages/index.js)
  - [pages/\document.js](pages/document.js)

## Using antd as the component library

- Reusing components from [Ant design](https://ant.design)

  Take a look at the following files

  - [pages/index.js](pages/index.js)

## Localization using react-intl

- Translations using [React Intl](https://github.com/formatjs/react-intl)

  Take a look at the following files

  - [app/lang/en.json](app/lang/en.json)
  - [app/i18n](app/i18n.js)
  - [pages/\_app.js](pages/_app.js)

## Custom enviornments using emv-cmd

- Custom enviornments using env-cmd for more flexibilty [env-cmd](https://www.npmjs.com/package/env-cmd)

  Take a look at the following files

  - [environments/env.development](environments/env.development)
  - [environments/env.production](environments/env.production)
  - [environments/env.qa](environments/env.qa)
  - [package.json](package.json)

  Note:-

  1. To avoid confusion & conflicts, Please use custom enviornments only instead of next.js default enviornment setup

  2. To include env variables on the client side just add NEXT_PUBLIC before the enviornment variable name
     Example : `NEXT_PUBLIC_SAMPLE_VARIABLE: some_value`.

  Example usage for running dev server with .env.development `env-cmd -f environments/.env.development next dev`

## Implementing CI/CD pipelines using Github Actions

- CI/CD using Github Actions.
  The CI pipeline has the following phases

  - Checkout
  - Install dependencies
  - Lint
  - Test
  - Build

  The CD pipeline has the following phases

  - Checkout
  - Install dependencies
  - Build
  - Deploy

  Take a look at the following files

  - [.github/workflows/ci.yml](.github/workflows/ci.yml)
  - [.github/workflows/cd.yml](.github/workflows/cd.yml)

## Testing using @testing-library/react

- Testing is done using the @testing-library/react.

  Take a look at the following files

  - [jest.config.js](jest.config.js)
  - [jest.setup.js](jest.setup.js)
  - [app/components/Text/tests](app/components/Text/tests)
  - [app/services/tests/repoApi.test.js](app/services/tests/repoApi.test.js)

## Development

### Start server

- **Development:** `yarn start:dev`

- **Production:** `yarn start:prod`

### Build project (SSG)

- **Development:** `yarn build:dev`

- **Production:** `yarn build:prod`

### Start Custom server

- `yarn custom:dev`

## Misc

### Aliasing

- @app -> app/
- @components -> app/components/
- @services -> app/services/
- @utils -> app/utils/
- @themes -> app/themes/
- @store -> app/store/
- @images -> app/images/

Take a look at the following files

- [next.config.js](next.config.js)

### Index page

- [pages/index.js](pages/index.js)

### Custom document

- [pages/\_document.js](pages/_document.js)

### Custom app

- [pages/\app.js](pages/app.js)
