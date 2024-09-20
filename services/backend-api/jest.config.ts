module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // For TypeScript
    "^.+\\.js$": "babel-jest", // For JavaScript
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!(your-module-to-transform)/)"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
};
