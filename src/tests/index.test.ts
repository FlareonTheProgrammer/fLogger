import { FloggerClass } from "../index";
import * as fs from "fs";
import moment from "moment";

const logLocation = `${__dirname}/logs/`

try {

class BotLager extends FloggerClass {
    cmd(msg: string) {
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

    const testFilename = `${moment().format("YYYYMMDD")}-TEST.log`
    console.assert(fs.existsSync(logLocation), "logDir does not exist")
    console.assert(fs.existsSync(logLocation + testFilename), "Logfile does not exist")
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
  } catch (error) {
    console.error("Failed to remove testfile. Reason:", error);
  }
} catch (error) {
  console.error("Test failed. Reason:", error);
}