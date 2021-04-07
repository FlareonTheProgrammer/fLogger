import fmt from "./fmt";
import * as fs from "fs";
import * as util from "util";
import * as _ from "underscore";
import * as crypto from "crypto";
import moment from "moment";



class FloggerClass {
  constructor() {
    // Maybe put something here later, idk
  }

  fmt = fmt

  timestamp() {
    return `[${moment().format("MM-DD-YYYY hh:mm:ss.SSS")}] `;
  }

  label(input: string, color?: string) {
    if (color) {
      return `${fmt.noBleed(`[${fmt.txt[color] + input}`)}]`;
    } else {
      return `[${input}]`;
    }
  }

  private generateID() {
    return crypto
      .createHash("shake256", { outputLength: 8 })
      .update(Buffer.from(this.timestamp()))
      .digest("hex");
  }

  floggerNewSession =
    util.format(
      `${
        this.timestamp() + this.label("FLOGGER_INTERNAL")
      } » New Flogger session started with Session ID: ${this.generateID()}`
    ) + "\n";

  protected core = (options: any) => {
    _.defaults(options, {
      method: "log",
      isUserDefined: false,
      title: "CUSTOM",
      color: "lCyan",
      msg: "This is a custom log. However... you didn't provide a message.",
    });
    let k = options;

    const useFormatting = (formatting: boolean) => {
      switch (formatting) {
        case true:
          return `${
            fmt.noBleed(this.timestamp()) + this.label(k.title, k.color)
          } » ${fmt.noBleed(options.msg)}`;
        case false:
          switch (k.isUserDefined) {
            case true:
              return `${this.timestamp() + this.label(k.title) + this.label("USER_DEFINED")} » ${
                k.msg
              }`;
            case false:
              return `${this.timestamp() + this.label(k.title)} » ${k.msg}`;
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

  setLogDir(directory: fs.PathLike) {
    process.env.FLOGGER_DIR = directory.toString();
    if (fs.existsSync(directory)) {
      console.info(
        `${
          this.timestamp() + this.label("FLOGGER_INTERNAL", "blue")
        } » ${"Directory already exists; don't need to make one. Setting env variable..."}`
      );
      let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
        flags: "a",
      });
      logfile.write(this.floggerNewSession);
    } else {
      fs.mkdirSync(directory);
      let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
        flags: "a",
      });
      logfile.write(this.floggerNewSession);
    }
  }

  info = (msg: string) => {
    return this.core({
      method: "info",
      title: "INFO",
      color: "blue",
      msg: msg,
    });
  };

  log = (msg: string) => {
    return this.core({
      method: "log",
      title: "LOG",
      color: "lGreen",
      msg: msg,
    });
  };

  warn = (msg: string) => {
    return this.core({
      method: "warn",
      title: "WARN",
      color: "yellow",
      msg: msg,
    });
  };

  error = (msg: string) => {
    return this.core({
      method: "error",
      title: "ERROR",
      color: "red",
      msg: msg,
    });
  };

  custom = (options: any) => {
    options.isUserDefined = true;
    return this.core(options);
  };
}
/*
core("info", "Custom", "lCyan", "This is a custom thing.");
core("Custom", "lBlue", "This is a custom thing that defaults to using console.log");
info("This is info.");
log("This is a log.");
warn("This is a warning.")
error("This is an error.");
*/

// Legacy Support
/*
const flogger = new FloggerClass();
// it would be less than desirable to have to list every thing we're pulling from the class, but...
// I can't think of any other solution at the moment.
*/

export = {
  FloggerClass,
  /*
  custom,
  info,
  log,
  warn,
  error,
  setLogDir,
  */
};
