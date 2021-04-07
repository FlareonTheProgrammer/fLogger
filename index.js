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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fmt_1 = __importDefault(require("./fmt"));
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const _ = __importStar(require("underscore"));
const crypto = __importStar(require("crypto"));
const moment_1 = __importDefault(require("moment"));
class FloggerClass {
    constructor() {
        this.fmt = fmt_1.default;
        this.floggerNewSession = util.format(`${this.timestamp() + this.label("FLOGGER_INTERNAL")} » New Flogger session started with Session ID: ${this.generateID()}`) + "\n";
        this.core = (options) => {
            _.defaults(options, {
                method: "log",
                isUserDefined: false,
                title: "CUSTOM",
                color: "lCyan",
                msg: "This is a custom log. However... you didn't provide a message.",
            });
            let k = options;
            const useFormatting = (formatting) => {
                switch (formatting) {
                    case true:
                        return `${fmt_1.default.noBleed(this.timestamp()) + this.label(k.title, k.color)} » ${fmt_1.default.noBleed(options.msg)}`;
                    case false:
                        switch (k.isUserDefined) {
                            case true:
                                return `${this.timestamp() + this.label(k.title) + this.label("USER_DEFINED")} » ${k.msg}`;
                            case false:
                                return `${this.timestamp() + this.label(k.title)} » ${k.msg}`;
                        }
                }
            };
            console[options.method](useFormatting(true));
            if (process.env.FLOGGER_DIR !== undefined) {
                let logfile = fs.createWriteStream(`${process.env.FLOGGER_DIR}/flogger.log`, {
                    flags: "a",
                });
                logfile.write(util.format(useFormatting(false)) + "\n");
            }
        };
        this.info = (msg) => {
            return this.core({
                method: "info",
                title: "INFO",
                color: "blue",
                msg: msg,
            });
        };
        this.log = (msg) => {
            return this.core({
                method: "log",
                title: "LOG",
                color: "lGreen",
                msg: msg,
            });
        };
        this.warn = (msg) => {
            return this.core({
                method: "warn",
                title: "WARN",
                color: "yellow",
                msg: msg,
            });
        };
        this.error = (msg) => {
            return this.core({
                method: "error",
                title: "ERROR",
                color: "red",
                msg: msg,
            });
        };
        this.custom = (options) => {
            options.isUserDefined = true;
            return this.core(options);
        };
        // Maybe put something here later, idk
    }
    timestamp() {
        return `[${moment_1.default().format("MM-DD-YYYY hh:mm:ss.SSS")}] `;
    }
    label(input, color) {
        if (color) {
            return `${fmt_1.default.noBleed(`[${fmt_1.default.txt[color] + input}`)}]`;
        }
        else {
            return `[${input}]`;
        }
    }
    generateID() {
        return crypto
            .createHash("shake256", { outputLength: 8 })
            .update(Buffer.from(this.timestamp()))
            .digest("hex");
    }
    setLogDir(directory) {
        process.env.FLOGGER_DIR = directory.toString();
        if (fs.existsSync(directory)) {
            console.info(`${this.timestamp() + this.label("FLOGGER_INTERNAL", "blue")} » ${"Directory already exists; don't need to make one. Setting env variable..."}`);
            let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
                flags: "a",
            });
            logfile.write(this.floggerNewSession);
        }
        else {
            fs.mkdirSync(directory);
            let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
                flags: "a",
            });
            logfile.write(this.floggerNewSession);
        }
    }
}
module.exports = {
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
//# sourceMappingURL=index.js.map