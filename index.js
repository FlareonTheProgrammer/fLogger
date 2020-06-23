const fmt = require("./fmt");

const core = (method, title, color, msg) => {
    if (msg === undefined && color !== undefined) {
        msg = color;
        color = title;
        title = method;
        method = "log";
    };
    return console[method](`${fmt.reset}[${fmt.time}] [${fmt.txt[color] + title + fmt.reset}] » ${fmt.reset + msg + fmt.reset}`)
}

const info = (msg) => {
    return core("info", "INFO", "blue", msg)
}

const log = (msg) => {
    return core("log", "LOG", "lGreen", msg)
}

const warn = (msg) => {
    return core("warn", "WARN", "yellow", msg)
}

const error = (msg) => {
    return core("error", "ERROR", "red", msg)
}

/*
core("info", "Custom", "lCyan", "This is a custom thing.");
core("Custom", "lBlue", "This is a custom thing that defaults to using console.log");
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