module.exports = {
  testEnvironment: "node",
  setupFiles: ["dotenv/config", "module-alias/register"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
