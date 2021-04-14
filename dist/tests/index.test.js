"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
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
const botLogger = new BotLager();
botLogger.cmd("$USER ran $COMMAND.NAME in $CHANNEL");
botLogger.log("Testing!");
