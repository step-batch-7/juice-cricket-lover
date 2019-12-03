const fs = require("fs");
const processArgs = require("./src/processArgs.js").processArgs;
const { getDataStorePath, timeStamp } = require("./src/config");

const main = function(userArgs, env) {
  const argsListForProcessing = {
    isExist: fs.existsSync,
    readFile: fs.readFileSync,
    fileWriter: fs.writeFileSync,
    path: getDataStorePath(env),
    date: timeStamp.bind(null, env),
    userArgs: userArgs
  };

  const message = processArgs(argsListForProcessing);
  console.log(message);
};

main(process.argv, process.env);
