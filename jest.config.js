module.exports = {
  clearMocks: true,                                   // Clear mock calls between every test
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],  // Generate coverage report from src dir
  coverageDirectory: 'coverage',                      // Specify coverage report output dir
  roots: [ '<rootDir>/src' ],                         // All TS files are in the src directory
  testRegex: '.+\.test\.tsx?$',                       // Look for file.test.ts/s files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',                     // Specify use of ts-jest for all .ts/.tsx files
  },
  verbose: false,                                     // Specify whether to report each indiv test
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",                      // Use tsconfig for ts-jest
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
