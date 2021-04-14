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
exports.flog = exports.FloggerClass = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const crypto = __importStar(require("crypto"));
const moment_1 = __importDefault(require("moment"));
class FloggerClass {
    constructor() {
        this.floggerNewSession = util.format(`${this.timestamp() + this.label("FLOGGER_INTERNAL")} » New Flogger session started with Session ID: ${this.generateID()}`) + "\n";
        // Maybe put something here later, idk
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
        console[options.method](`${this.timestamp() + this.label(options.title, options.color)} » ${options.msg}`);
        if (process.env.FLOGGER_DIR !== undefined) {
            const logfile = fs.createWriteStream(`${process.env.FLOGGER_DIR}/flogger.log`, {
                flags: "a",
            });
            logfile.write(util.format(`${this.timestamp() + this.label(options.title)} » ${options.msg}`) + "\n");
        }
    }
    setLogDir(directory) {
        process.env.FLOGGER_DIR = directory.toString();
        if (fs.existsSync(directory)) {
            console.info(`${this.timestamp() + this.label("FLOGGER_INTERNAL", "blue")} » ${"Directory already exists; don't need to make one. Setting env variable..."}`);
            const logfile = fs.createWriteStream(`${directory}/flogger.log`, {
                flags: "a",
            });
            logfile.write(this.floggerNewSession);
        }
        else {
            fs.mkdirSync(directory);
            const logfile = fs.createWriteStream(`${directory}/flogger.log`, {
                flags: "a",
            });
            logfile.write(this.floggerNewSession);
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
// Legacy Support
exports.flog = new FloggerClass();
// it would be less than desirable to have to list every thing we're pulling from the class, but...
// I can't think of any other solution at the moment.
