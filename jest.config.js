module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: require('./tsconfig.json'),
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'html'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^api/(.*)$': '<rootDir>/src/pages/api/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest/presets/js-with-babel',
  testPathIgnorePatterns: ['.next'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
}
