const fmt = require("./fmt");

const core = (title, color, msg) => {
    return console.log(`${fmt.reset}[ ${fmt.time} ] [${fmt.txt[color] + title + fmt.reset}] » ${fmt.reset + msg + fmt.reset}`)
}

const info = (msg) => {
    return core("INFO", "blue", msg)
}

const log = (msg) => {
    return core("LOG", "lGreen", msg)
}

const warn = (msg) => {
    return core("WARN", "yellow", msg)
}

const error = (msg) => {
    return core("ERROR", "red", msg)
}

/* This was from testing
core("Custom", "lCyan", "This is a custom thing.");
info("This is info.");
log("This is a log.");
warn("This is a warning.")
error("This is an error.");
*/

module.exports = {
    custom: core,
    info,
    log,
    warn,
    error
};