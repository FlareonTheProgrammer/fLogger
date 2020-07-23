"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const fmt_1 = __importDefault(require("./fmt"));
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const _ = __importStar(require("underscore"));
const crypto = __importStar(require("crypto"));
const moment_1 = __importDefault(require("moment"));
function timestamp() {
    return `[${moment_1.default().format("MM-DD-YYYY hh:mm:ss.SSS")}] `;
}
function label(input, color) {
    if (color) {
        return `${fmt_1.default.noBleed(`[${fmt_1.default.txt[color] + input}`)}]`;
    }
    else {
        return `[${input}]`;
    }
}
function generateID() {
    return crypto
        .createHash("shake256", { outputLength: 8 })
        .update(Buffer.from(timestamp()))
        .digest("hex");
}
const floggerNewSession = util.format(`${timestamp() + label("FLOGGER_INTERNAL")} » New Flogger session started with Session ID: ${generateID()}`) + "\n";
const core = (options) => {
    _.defaults(options, {
        method: "log",
        isUserDefined: false,
        title: "CUSTOM",
        color: "lCyan",
        msg: "This is a custom log. However... you didn't provide a message.",
    });
    let k = options;
    function useFormatting(formatting) {
        switch (formatting) {
            case true:
                return `${fmt_1.default.noBleed(timestamp()) + label(k.title, k.color)} » ${fmt_1.default.noBleed(options.msg)}`;
            case false:
                switch (k.isUserDefined) {
                    case true:
                        return `${timestamp() + label(k.title) + label("USER_DEFINED")} » ${k.msg}`;
                    case false:
                        return `${timestamp() + label(k.title)} » ${k.msg}`;
                }
        }
    }
    console[options.method](useFormatting(true));
    if (process.env.FLOGGER_DIR !== undefined) {
        let logfile = fs.createWriteStream(`${process.env.FLOGGER_DIR}/flogger.log`, {
            flags: "a",
        });
        logfile.write(util.format(useFormatting(false)) + "\n");
    }
};
function setLogDir(directory) {
    process.env.FLOGGER_DIR = directory.toString();
    if (fs.existsSync(directory)) {
        console.info(`${timestamp() + label("FLOGGER_INTERNAL", "blue")} » ${"Directory already exists; don't need to make one. Setting env variable..."}`);
        let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
            flags: "a",
        });
        logfile.write(floggerNewSession);
    }
    else {
        fs.mkdirSync(directory);
        let logfile = fs.createWriteStream(`${directory}/flogger.log`, {
            flags: "a",
        });
        logfile.write(floggerNewSession);
    }
}
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
const custom = (options) => {
    options.isUserDefined = true;
    return core(options);
};
module.exports = {
    custom,
    info,
    log,
    warn,
    error,
    setLogDir,
};
//# sourceMappingURL=index.js.map