import chalk from "chalk";
import moment from "moment";
import _ from "underscore";
import * as fs from "fs";
import * as __util from "util";
import * as util from "./util";
import * as crypto from "crypto";


export class FloggerClass {
  logDir?: fs.PathLike;
  logfile?: string;
//  __logfile?: string
  constructor(loggerOptions?: util.LoggerOptions) {
    if(loggerOptions) {
      const opts = loggerOptions;
      if(opts.save) {
        _.defaults(opts.save, {
          appName: "flogger",
          // splitOnDateChange: true,
          // disableInternalLog: false,
        });
        const sv = opts.save;
        if(sv.logDir.toString().endsWith("/")) {sv.logDir = sv.logDir.toString().slice(0, -1);}
        this.logDir = sv.logDir;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sv.appName = util.enforceFilenameRegex(sv.appName!);
        if(sv.appName == "") {
          sv.appName = "flogger";
        }
        this.logfile = `${moment().format("YYYYMMDD")}-${sv.appName}.log`;
        // if(!sv.disableInternalLog) {this.__logfile = `flogger_internal.log`;}
        if (!fs.existsSync(this.logDir)) { fs.mkdirSync(this.logDir); }
        fs.appendFileSync(`${this.logDir}/${this.logfile}`, this.floggerNewSession);
      }
    }
  }

  private label(input: string, color?: util.Color) {
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
    __util.format(
      `${
        this.timestamp() + this.label("FLOGGER_INTERNAL")
      } » New Flogger session started with Session ID: ${this.generateID()}`
    ) + "\n";

  protected core(options: util.CoreOptions) : void {

    const stamp = this.timestamp();

    console[options.method](`${
      stamp + this.label(options.title, options.color)
    } » ${options.msg}`);

    if (this.logfile) {
      fs.appendFileSync(`${this.logDir}/${this.logfile}`, __util.format(`${stamp + this.label(options.title)} » ${options.msg}`) + "\n");
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
  public custom(options: util.CustomOptions) : void {
    return this.core(options);
  }
}
