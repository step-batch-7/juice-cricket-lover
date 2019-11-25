const getString = require("./src/beverageLib.js").getString;
const readArguments = require("./src/beverageLib.js").readArguments;
const processArgs = require("./src/beverageLib.js").processArgs;

const main = function() {
  const userArgs = readArguments(process.argv);
  const result = processArgs(userArgs);
  console.log(getString(result));
};

main();
