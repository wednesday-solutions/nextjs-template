<div>
  <a href="https://www.wednesday.is?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" align="left" style="margin-left: 0;">
    <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f5879492fafecdb3e5b0e75_wednesday_logo.svg">
  </a>
  <p>
    <h1 align="left">Next.js Template
    </h1>
  </p>

  <p>
An enterprise Next.js template application showcasing - Testing strategies, Global state management, Custom enviornments, a network layer, component library integration, localization, Image loading, Custom App, Custom document, IE 11 compatibility and Continuous integration & deployment.
  </p>

---

  <p>
    <h4>
      Expert teams of digital product strategists, developers, and designers.
    </h4>
  </p>

  <div>
    <a href="https://www.wednesday.is/contact-us?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88b9005f9ed382fb2a5_button_get_in_touch.svg" width="121" height="34">
    </a>
    <a href="https://github.com/wednesday-solutions/" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88bb1958c3253756c39_button_follow_on_github.svg" width="168" height="34">
    </a>
  </div>

---

<span>We’re always looking for people who value their work, so come and join us. <a href="https://www.wednesday.is/hiring">We are hiring!</a></span>

</div>

### Out of the box support

- Global state management using `redux`
- Side Effects using `redux-saga`
- API calls using `api-sauce`
- Styling using emotion
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

## Styling using emotion

- Styling components using [Emotion](https://emotion.sh/)

  Take a look at the following files

  - [app/components/Text/index.js](app/components/Text/index.js)
  - [pages/index.js](pages/index.js)
  - [pages/\_document.js](pages/_document.js)

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

- [pages/\_app.js](pages/_app.js)
