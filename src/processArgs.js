const { updateAndGetTransactionDetails } = require("./saveUtilities.js");
const { getTransactionDetailsOfPerson } = require("./queryUtilities.js");
const { readExistingTransactions, readArguments } = require("./readArgs.js");

const processArgs = function(processingArgs) {
  const {
    isExist,
    readFile,
    path,
    userArgs,
    fileWriter,
    date
  } = processingArgs;

  const argsListForReadingExistingTransactions = {
    isExist: isExist,
    readFile: readFile,
    path: path
  };

  const existingTransactions = readExistingTransactions(
    argsListForReadingExistingTransactions
  );

  const args = readArguments(userArgs, date);
  const operation = args["operation"];
  const listOfOperations = {
    "--save": updateAndGetTransactionDetails,
    "--query": getTransactionDetailsOfPerson
  };

  const operationToBePerformed = listOfOperations[operation];
  const result = operationToBePerformed(
    args,
    existingTransactions,
    path,
    fileWriter
  );

  return result;
};

exports.processArgs = processArgs;
