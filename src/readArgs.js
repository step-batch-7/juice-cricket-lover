const readExistingTransactions = function(fileAccessFuncs) {
  const fileExists = fileAccessFuncs.isExist;
  const fileReader = fileAccessFuncs.readFile;
  const filePath = fileAccessFuncs.path;
  if (!fileExists(filePath)) {
    return [];
  }
  return JSON.parse(fileReader(filePath, "utf8"));
};

const getPairedArgs = function(args) {
  if (args.length == 0) {
    return {};
  }
  let pairs = {};
  pairs[args[0]] = args[1];

  return Object.assign(pairs, getPairedArgs(args.slice(2)));
};

const getArgsForSave = function(args, date) {
  let userArgs = {};
  userArgs = {
    operation: args[0],
    transactionDetails: {
      "--beverage": args[2],
      "--empId": args[4],
      "--qty": args[6],
      date: date()
    }
  };
  return userArgs;
};

const getArgsForQuery = function(args, date) {
  userArgs = {
    operation: args[0],
    transactionDetails: getPairedArgs(args.slice(1))
  };
  return userArgs;
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

exports.getArgsForSave = getArgsForSave;
exports.getArgsForQuery = getArgsForQuery;
exports.readArguments = readArguments;
exports.readExistingTransactions = readExistingTransactions;
exports.getPairedArgs = getPairedArgs;
