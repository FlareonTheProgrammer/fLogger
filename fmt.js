
reset = "\x1b[0m"
bright = "\x1b[1m"
dim = "\x1b[2m"
underline = "\x1b[4m"
blink = "\x1b[5m"
reverse = "\x1b[7m"
hidden = "\x1b[8m"

const txt = {
    dRed: `${reset}${dim}\x1b[31m`,
    dGreen: `${reset}${dim}\x1b[32m`,
    dYellow: `${reset}${dim}\x1b[33m`,
    dBlue: `${reset}${dim}\x1b[34m`,
    dMagenta: `${reset}${dim}\x1b[35m`,
    dCyan: `${reset}${dim}\x1b[36m`,

    red: `\x1b[31m`,
    green: `\x1b[32m`,
    yellow: `\x1b[33m`,
    blue: `\x1b[34m`,
    magenta: `\x1b[35m`,
    cyan: `\x1b[36m`,

    lRed: `${reset}${bright}\x1b[31m`,
    lGreen: `${reset}${bright}\x1b[32m`,
    lYellow: `${reset}${bright}\x1b[33m`,
    lBlue: `${reset}${bright}\x1b[34m`,
    lMagenta: `${reset}${bright}\x1b[35m`,
    lCyan: `${reset}${bright}\x1b[36m`,

    white: `${reset}\x1b[37m`,
    lGrey: `${reset}${dim}\x1b[37m`,
    grey: `${reset}${bright}\x1b[30m`,
    dGrey: `${reset}${dim}${bright}\x1b[30m`,
    black: `${reset}\x1b[30m`
};

const bg = {
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    black: "\x1b[40m",
};

const time = "placeholder for date/time"

module.exports = {
    reset,
    bright,
    dim,
    underline,
    blink,
    reverse,
    hidden,
    txt,
    bg,
    time
};