module.exports = {
  "roots": [
    "<rootDir>/src",                     // All TS files are in the src directory
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",        // Specify use of ts-jest for all .ts/.tsx files
  },
  "testRegex": ".+\.test\.tsx?$",        // Look for file.test.ts/s files
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json",       // Use tsconfig for ts-jest
    },
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
};
