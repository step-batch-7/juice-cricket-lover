const readArguments = require("./src/readArgs.js").readArguments;
const processArgs = require("./src/processArgs.js").processArgs;
const fs = require("fs");
const readExistingTransactions = require("./src/readArgs.js")
  .readExistingTransactions;

const main = function() {
  const date = function() {
    return new Date().toJSON();
  };
  const filePath = "./assets/transactions.json";
  const existingTransactions = readExistingTransactions(
    fs.existsSync,
    fs.readFileSync,
    filePath
  );
  const userArgs = readArguments(process.argv, date);
  const result = processArgs(
    userArgs,
    filePath,
    existingTransactions,
    fs.writeFileSync
  );
  console.log(result);
};

main();
