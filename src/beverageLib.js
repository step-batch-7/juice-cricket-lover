const getDate = function() {
  return new Date();
};

const getString = function(list) {
  return list.join("\n");
};

const getArgsForSave = function(args) {
  let userArgs = {};
  const date = JSON.stringify(getDate());
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--beverage": args[2],
      "--empId": +args[4],
      "--qty": +args[6],
      date: date
    }
  };
  return userArgs;
};

const getArgsForQuery = function(args) {
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--empId": +args[2]
    }
  };
  return userArgs;
};

const readArguments = function(totalArgs) {
  const args = totalArgs.slice(2);
  let operation = args[0];
  let listOfOperations = {
    "--save": getArgsForSave,
    "--query": getArgsForQuery
  };

  let userArgs = listOfOperations[operation](args);
  return userArgs;
};

const saveTransactionDetails = function(presentTransactionDetails) {
  let result = [];
  let details = presentTransactionDetails["transactionDetails"];
  let transactionDetails = [
    details["--empId"],
    details["--beverage"],
    details["--qty"],
    details["date"]
  ];
  result.push(
    "transaction recorded:",
    ["Employee ID", "Beverage", "Quantity", "Date"],
    transactionDetails
  );
  return result;
};

const getTransactionDetailsOfPerson = function(args) {
  let result = [];
  let details = args["transactionDetails"];
  let transactionDetails = [details["--empId"]];

  result.push(
    ["Employee ID", "Beverage", "Quantity", "Date"],

    transactionDetails
  );
  return result;
};

const processArgs = function(args) {
  const operation = args["operation"];
  const listOfOperations = {
    "--save": saveTransactionDetails,
    "--query": getTransactionDetailsOfPerson
  };
  let result = listOfOperations[operation](args);
  return result;
};

exports.readArguments = readArguments;
exports.processArgs = processArgs;
exports.getString = getString;
