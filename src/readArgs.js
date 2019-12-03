const readExistingTransactions = function(fileAccessFuncs) {
  const { isExist, readFile, path } = fileAccessFuncs;
  if (!isExist(path)) {
    return [];
  }
  return JSON.parse(readFile(path, "utf8"));
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
  const userArgs = {
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
  const operation = args[0];
  const listOfOperations = {
    "--save": getArgsForSave,
    "--query": getArgsForQuery
  };

  const userArgs = listOfOperations[operation](args, date);
  return userArgs;
};

module.exports = {
  getArgsForSave,
  getArgsForQuery,
  getPairedArgs,
  readExistingTransactions,
  readArguments
};
