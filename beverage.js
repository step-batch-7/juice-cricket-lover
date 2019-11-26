const readArguments = require("./src/beverageLib.js").readArguments;
const processArgs = require("./src/beverageLib.js").processArgs;
const readExistingTransactions = require("./src/beverageLib.js")
  .readExistingTransactions;

const main = function() {
  const date = new Date().toJSON();
  const filePath = "./assets/transactions.json";
  const previousDetails = readExistingTransactions(filePath);
  const userArgs = readArguments(process.argv, date);
  const result = processArgs(userArgs, filePath, previousDetails, date);
  console.log(result);
};

main();
