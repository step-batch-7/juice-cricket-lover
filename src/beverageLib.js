const fs = require("fs");
const updateAndGetTransactionDetails = require("./saveUtilities.js")
  .updateAndGetTransactionDetails;
const getArgsForSave = require("./saveUtilities.js").getArgsForSave;
const getTransactionDetailsOfPerson = require("./queryUtilities.js")
  .getTransactionDetailsOfPerson;
const getArgsForQuery = require("./queryUtilities.js").getArgsForQuery;

const readExistingTransactions = function(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const readArguments = function(totalArgs, date) {
  const args = totalArgs.slice(2);
  let operation = args[0];
  let listOfOperations = {
    "--save": getArgsForSave,
    "--query": getArgsForQuery
  };

  let userArgs = listOfOperations[operation](args, date);
  return userArgs;
};

const processArgs = function(args, filePath, previousDetails, date) {
  const operation = args["operation"];
  const listOfOperations = {
    "--save": updateAndGetTransactionDetails,
    "--query": getTransactionDetailsOfPerson
  };
  let result = listOfOperations[operation](
    args,
    filePath,
    previousDetails,
    date
  );
  return result;
};

exports.readArguments = readArguments;
exports.processArgs = processArgs;
exports.readExistingTransactions = readExistingTransactions;
