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

  if (options.logfile !== undefined) {
    let logfile = fs.createWriteStream(options.logfile, { flags: "a" });
    logfile.write(util.format(useFmting(false)) + "\n");
  }
};

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
};
