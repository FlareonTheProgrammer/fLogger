import fmt from "./fmt";
import * as fs from "fs";
import * as util from "util";
import * as _ from "underscore";

const core = (options: any) => {
  _.defaults(options, {
    method: "log",
    title: "CUSTOM",
    color: "lCyan",
    msg: "This is a custom log. However... you didn't provide a message.",
  });
  function useFmting(formatting: boolean) {
    if (formatting === true) {
      return `${fmt.reset}[${fmt.time}] [${
        fmt.txt[options.color] + options.title + fmt.reset
      }] » ${fmt.reset + options.msg + fmt.reset}`;
    } else return `[${fmt.time}] [${options.title}] » ${options.msg}`;
  }
  console[options.method](useFmting(true));

  if (process.env.FLOGGER_DIR !== undefined) {
    let logfile = fs.createWriteStream(
      `${process.env.FLOGGER_DIR}/flogger.log`,
      {
        flags: "a",
      }
    );
    logfile.write(util.format(useFmting(false)) + "\n");
  }
};

function setLogDir(directory: fs.PathLike) {
  process.env.FLOGGER_DIR = directory.toString();
  if (fs.existsSync(directory)) {
    console.info(
      `${fmt.reset}[${fmt.time}] [${
        fmt.txt["blue"] + "fLogger" + fmt.reset
      }] » ${
        fmt.reset +
        "Directory already exists; don't need to make one. Setting env variable..." +
        fmt.reset
      }`
    );
    let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
      flags: "a",
    });
    logfile.write(
      util.format(
        `[${fmt.time}] [FLOGGER_INTERNAL] » New Flogger session started.`
      ) + "\n"
    );
  } else {
    fs.mkdirSync(directory);
    let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
      flags: "a",
    });
    logfile.write(
      util.format(
        `[${fmt.time}] [FLOGGER_INTERNAL] » New Flogger session started.`
      ) + "\n"
    );
  }
}

const info = (msg: string) => {
  return core({
    method: "info",
    title: "INFO",
    color: "blue",
    msg: msg,
  });
};

const log = (msg: string) => {
  return core({
    method: "log",
    title: "LOG",
    color: "lGreen",
    msg: msg,
  });
};

const warn = (msg: string) => {
  return core({
    method: "warn",
    title: "WARN",
    color: "yellow",
    msg: msg,
  });
};

const error = (msg: string) => {
  return core({
    method: "error",
    title: "ERROR",
    color: "red",
    msg: msg,
  });
};

/*
core("info", "Custom", "lCyan", "This is a custom thing.");
core("Custom", "lBlue", "This is a custom thing that defaults to using console.log");
info("This is info.");
log("This is a log.");
warn("This is a warning.")
error("This is an error.");
*/

export = {
  custom: core,
  info,
  log,
  warn,
  error,
  setLogDir,
};
