"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloggerClass = void 0;
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const underscore_1 = __importDefault(require("underscore"));
const fs = __importStar(require("fs"));
const __util = __importStar(require("util"));
const util = __importStar(require("./util"));
const crypto = __importStar(require("crypto"));
class FloggerClass {
    //  __logfile?: string
    constructor(loggerOptions) {
        this.floggerNewSession = __util.format(`${this.timestamp() + this.label("FLOGGER_INTERNAL")} » New Flogger session started with Session ID: ${this.generateID()}`) + "\n";
        if (loggerOptions) {
            const opts = loggerOptions;
            if (opts.save) {
                underscore_1.default.defaults(opts.save, {
                    appName: "flogger",
                });
                const sv = opts.save;
                if (sv.logDir.toString().endsWith("/")) {
                    sv.logDir = sv.logDir.toString().slice(0, -1);
                }
                this.logDir = sv.logDir;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                sv.appName = util.enforceFilenameRegex(sv.appName);
                if (sv.appName == "") {
                    sv.appName = "flogger";
                }
                this.logfile = `${moment_1.default().format("YYYYMMDD")}-${sv.appName}.log`;
                // if(!sv.disableInternalLog) {this.__logfile = `flogger_internal.log`;}
                if (!fs.existsSync(this.logDir)) {
                    fs.mkdirSync(this.logDir);
                }
                fs.appendFileSync(`${this.logDir}/${this.logfile}`, this.floggerNewSession);
            }
        }
    }
    label(input, color) {
        if (color) {
            return `[${chalk_1.default[color](input)}] `;
        }
        else {
            return `[${input}] `;
        }
    }
    timestamp() {
        return `[${moment_1.default().format("MM-DD-YYYY hh:mm:ss.SSS")}] `;
    }
    generateID() {
        return crypto
            .createHash("shake256", { outputLength: 8 })
            .update(Buffer.from(this.timestamp()))
            .digest("hex");
    }
    core(options) {
        const stamp = this.timestamp();
        console[options.method](`${stamp + this.label(options.title, options.color)} » ${options.msg}`);
        if (this.logfile) {
            fs.appendFileSync(`${this.logDir}/${this.logfile}`, __util.format(`${stamp + this.label(options.title)} » ${options.msg}`) + "\n");
        }
    }
    info(msg) {
        return this.core({
            method: "info",
            title: "INFO",
            color: "blue",
            msg: msg,
        });
    }
    log(msg) {
        return this.core({
            method: "log",
            title: "LOG",
            color: "greenBright",
            msg: msg,
        });
    }
    warn(msg) {
        return this.core({
            method: "warn",
            title: "WARN",
            color: "yellow",
            msg: msg,
        });
    }
    error(msg) {
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
    custom(options) {
        return this.core(options);
    }
}
exports.FloggerClass = FloggerClass;
