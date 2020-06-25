import fmt from "./fmt";
import * as fs from "fs";
import * as util from "util";
import * as _ from "underscore";
import * as crypto from "crypto";
import moment from "moment";

function timestamp() {
  return `[${moment().format("MM-DD-YYYY hh:mm:ss.SSS")}] `;
}

function label(input: string, color?: string) {
  if (color) {
    return `${fmt.noBleed(`[${fmt.txt[color] + input}`)}]`;
  } else {
    return `[${input}]`;
  }
}

function generateID() {
  return crypto
    .createHash("shake256", { outputLength: 8 })
    .update(Buffer.from(timestamp()))
    .digest("hex");
}

const floggerNewSession =
  util.format(
    `${
      timestamp() + label("FLOGGER_INTERNAL")
    } » New Flogger session started with Session ID: ${generateID()}`
  ) + "\n";

const core = (options: any) => {
  _.defaults(options, {
    method: "log",
    isUserDefined: false,
    title: "CUSTOM",
    color: "lCyan",
    msg: "This is a custom log. However... you didn't provide a message.",
  });
  let k = options;

  function useFormatting(formatting: boolean) {
    switch (formatting) {
      case true:
        return `${
          fmt.noBleed(timestamp()) + label(k.title, k.color)
        } » ${fmt.noBleed(options.msg)}`;
      case false:
        switch (k.isUserDefined) {
          case true:
            return `${timestamp() + label(k.title) + label("USER_DEFINED")} » ${
              k.msg
            }`;
          case false:
            return `${timestamp() + label(k.title)} » ${k.msg}`;
        }
    }
  }
  console[options.method](useFormatting(true));

  if (process.env.FLOGGER_DIR !== undefined) {
    let logfile = fs.createWriteStream(
      `${process.env.FLOGGER_DIR}/flogger.log`,
      {
        flags: "a",
      }
    );
    logfile.write(util.format(useFormatting(false)) + "\n");
  }
};

function setLogDir(directory: fs.PathLike) {
  process.env.FLOGGER_DIR = directory.toString();
  if (fs.existsSync(directory)) {
    console.info(
      `${
        timestamp() + label("FLOGGER_INTERNAL", "blue")
      } » ${"Directory already exists; don't need to make one. Setting env variable..."}`
    );
    let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
      flags: "a",
    });
    logfile.write(floggerNewSession);
  } else {
    fs.mkdirSync(directory);
    let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
      flags: "a",
    });
    logfile.write(floggerNewSession);
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

const custom = (options: any) => {
  options.isUserDefined = true;
  return core(options);
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
  custom,
  info,
  log,
  warn,
  error,
  setLogDir,
};
