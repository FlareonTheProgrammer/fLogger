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
const fmt_1 = __importDefault(require("./fmt"));
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const _ = __importStar(require("underscore"));
function setLogDir(directory) {
    if (fs.existsSync(directory)) {
        console.info(`${fmt_1.default.reset}[${fmt_1.default.time}] [${fmt_1.default.txt["blue"] + "fLogger" + fmt_1.default.reset}] » ${fmt_1.default.reset +
            "Directory already exists; don't need to make one. Setting env variable..." +
            fmt_1.default.reset}`);
        process.env.FLOGGER_DIR = directory.toString();
    }
    else
        fs.mkdirSync(directory);
    let logfile = fs.createWriteStream(`${process.env.FLOGGER_DIR}/flogger.log`, {
        flags: "a",
    });
    logfile.write(util.format(`[${fmt_1.default.time}] [FLOGGER_INTERNAL] » New Flogger session started.`) + "\n");
}
const core = (options) => {
    _.defaults(options, {
        method: "log",
        title: "CUSTOM",
        color: "lCyan",
        msg: "This is a custom log. However... you didn't provide a message.",
    });
    function useFmting(formatting) {
        if (formatting === true) {
            return `${fmt_1.default.reset}[${fmt_1.default.time}] [${fmt_1.default.txt[options.color] + options.title + fmt_1.default.reset}] » ${fmt_1.default.reset + options.msg + fmt_1.default.reset}`;
        }
        else
            return `[${fmt_1.default.time}] [${options.title}] » ${options.msg}`;
    }
    console[options.method](useFmting(true));
    if (process.env.FLOGGER_DIR !== undefined) {
        let logfile = fs.createWriteStream(`${process.env.FLOGGER_DIR}/flogger.log`, {
            flags: "a",
        });
        logfile.write(util.format(useFmting(false)) + "\n");
    }
};
const info = (msg) => {
    return core({
        method: "info",
        title: "INFO",
        color: "blue",
        msg: msg,
    });
};
const log = (msg) => {
    return core({
        method: "log",
        title: "LOG",
        color: "lGreen",
        msg: msg,
    });
};
const warn = (msg) => {
    return core({
        method: "warn",
        title: "WARN",
        color: "yellow",
        msg: msg,
    });
};
const error = (msg) => {
    return core({
        method: "error",
        title: "ERROR",
        color: "red",
        msg: msg,
    });
};
module.exports = {
    custom: core,
    info,
    log,
    warn,
    error,
    setLogDir,
};
//# sourceMappingURL=index.js.map