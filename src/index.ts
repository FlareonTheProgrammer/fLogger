import chalk from "chalk";
import * as fs from "fs";
import * as util from "util";
import * as lutil from "./lutil";
import * as crypto from "crypto";
import moment from "moment";



export class FloggerClass {
  constructor() {
    // Maybe put something here later, idk
  }

  private label(input: string, color?: lutil.Color) {
    if (color) {
      return `[${chalk[color](input)}] `;
    } else {
      return `[${input}] `;
    }
  }

  private timestamp() {
    return `[${moment().format("MM-DD-YYYY hh:mm:ss.SSS")}] `;
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

  protected core(options: lutil.CoreOptions) : void {

    console[options.method](`${
      this.timestamp() + this.label(options.title, options.color)
    } » ${options.msg}`);

    if (process.env.FLOGGER_DIR !== undefined) {
      const logfile = fs.createWriteStream(
        `${process.env.FLOGGER_DIR}/flogger.log`,
        {
          flags: "a",
        }
      );
      logfile.write(util.format(`${this.timestamp() + this.label(options.title)} » ${options.msg}`) + "\n");
    }
  }

  setLogDir(directory: fs.PathLike) : void {
    process.env.FLOGGER_DIR = directory.toString();
    if (fs.existsSync(directory)) {
      console.info(
        `${
          this.timestamp() + this.label("FLOGGER_INTERNAL", "blue")
        } » ${"Directory already exists; don't need to make one. Setting env variable..."}`
      );
      const logfile = fs.createWriteStream(`${directory}/flogger.log`, {
        flags: "a",
      });
      logfile.write(this.floggerNewSession);
    } else {
      fs.mkdirSync(directory);
      const logfile = fs.createWriteStream(`${directory}/flogger.log`, {
        flags: "a",
      });
      logfile.write(this.floggerNewSession);
    }
  }

  info(msg: string) : void {
    return this.core({
      method: "info",
      title: "INFO",
      color: "blue",
      msg: msg,
    });
  }

  log(msg: string) : void {
    return this.core({
      method: "log",
      title: "LOG",
      color: "greenBright",
      msg: msg,
    });
  }

  warn (msg: string) : void{
    return this.core({
      method: "warn",
      title: "WARN",
      color: "yellow",
      msg: msg,
    });
  }

  error(msg: string) : void {
    return this.core({
      method: "error",
      title: "ERROR",
      color: "red",
      msg: msg,
    });
  }

  /**
   * custom
   */
  public custom(options: lutil.CustomOptions) : void {
    return this.core(options);
  }
}


// Legacy Support
export const flog = new FloggerClass();
// it would be less than desirable to have to list every thing we're pulling from the class, but...
// I can't think of any other solution at the moment.
