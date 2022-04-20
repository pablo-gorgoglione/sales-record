/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "/home/pablo/Projects/sales-record/server/test/app.test.ts",
  ],
};
