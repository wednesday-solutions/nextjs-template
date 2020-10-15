module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/out/**',
    '!coverage/**',
    '!config/**',
    '!pages/**',
    '!server/**',
    '!global-styles.js',
    '!*.config.js',
    '!**/apiUtils.js',
    '!**/testUtils.js',
    '!**/themes/index.js',
    '!utils/constants.js',
    '!utils/fb.js',
    '!services/**',
    '!**/configureStore.js',
    '!**/polyfills.js'
  ],
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
    '@(components|utils|themes|services|store)(.*)$': '<rootDir>/$1/$2',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/config/jest/image.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$'
};
