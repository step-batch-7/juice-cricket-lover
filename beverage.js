const fs = require("fs");
const readArgs = require("./src/readArgs");
const { readArguments, readExistingTransactions } = readArgs;
const processArgs = require("./src/processArgs.js").processArgs;

const main = function() {
  const date = function() {
    return new Date();
  };
  const filePath = "./assets/transactions.json";
  const argsListForReadExistingTransactions = {
    isExist: fs.existsSync,
    readFile: fs.readFileSync,
    path: filePath
  };

  const existingTransactions = readExistingTransactions(
    argsListForReadExistingTransactions
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
