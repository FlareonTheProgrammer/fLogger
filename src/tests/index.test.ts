import { FloggerClass } from "../index";

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

const botLogger = new BotLager();

botLogger.cmd("$USER ran $COMMAND.NAME in $CHANNEL");

botLogger.log("Testing!");