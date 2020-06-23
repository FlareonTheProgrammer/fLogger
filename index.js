const fmt = require("./fmt");

const core = (title, color, msg) => {
    return console.log(`${fmt.reset}[ ${fmt.time} ] [${fmt.txt[color] + title + fmt.reset}] » ${fmt.reset + msg + fmt.reset}`)
}

const info = (msg) => {
    return ("INFO", "blue", msg)
}

const log = (msg) => {
    return ("LOG", "lGreen", msg)
}

const warn = (msg) => {
    return core("WARN", "yellow", msg)
}

const error = (msg) => {
    return core("ERROR", "red", msg)
}

error("HEY!");

module.exports = {
    custom: core,
    info,
    log,
    warn,
    error
};