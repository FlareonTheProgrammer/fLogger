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
const index_1 = require("../index");
const fs = __importStar(require("fs"));
const moment_1 = __importDefault(require("moment"));
const logLocation = `${__dirname}/logs/`;
try {
    class BotLager extends index_1.FloggerClass {
        cmd(msg) {
            return super.core({
                method: "log",
                title: "CMD",
                color: "magenta",
                msg: msg
            });
        }
    }
    const botLogger = new BotLager({
        save: {
            logDir: logLocation,
            appName: "TEST"
        }
    });
    botLogger.cmd("$USER ran $COMMAND.NAME in $CHANNEL");
    botLogger.log("Testing!");
    const testFilename = `${moment_1.default().format("YYYYMMDD")}-TEST.log`;
    console.assert(fs.existsSync(logLocation), "logDir does not exist");
    console.assert(fs.existsSync(logLocation + testFilename), "Logfile does not exist");
    const readLog = (fs.readFileSync(logLocation + testFilename)).toString();
    console.assert(readLog.includes("[CMD]  » $USER ran $COMMAND.NAME in $CHANNEL"), "test log string #1 was not found in the logfile");
    console.assert(readLog.includes("[LOG]  » Testing!"), "test log string #2 was not found in the logfile");
    console.assert(2 + 2 == 4, "God help you if this throws an exception");
    // @ts-expect-error
    console.assert(true == false, "This one is supposed to fail");
    console.log("Test passed. Removing testfile...");
    try {
        fs.unlink(logLocation + testFilename, () => {
            console.log("Successfully removed testfile.");
        });
    }
    catch (error) {
        console.error("Failed to remove testfile. Reason:", error);
    }
}
catch (error) {
    console.error("Test failed. Reason:", error);
}
