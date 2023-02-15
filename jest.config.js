module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'app/tests/**',
    '!app/**/*.d.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/out/**',
    '!coverage/**',
    '!config/**',
    '!pages/**',
    '!server/**',
    '!app/global-styles.js',
    '!*.config.js',
    '!**/apiUtils.js',
    '!**/testUtils.js',
    '!**/themes/index.js',
    '!**/utils/constants.js',
    '!**/configureStore.js',
    '!**/i18n.js',
    '!**/reducers.js',
    '!**/polyfills.js'
  ],
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleDirectories: ['node_modules', 'app'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js'
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '@app(.*)$': '<rootDir>/app/$1',
    '@(components|utils|themes|services|store)(.*)$': '<rootDir>/app/$1/$2',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/config/jest/image.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: ['@emotion/jest/serializer']
};
