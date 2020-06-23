const fmt = require("./fmt");


const info = (msg) => {
    console.log(`${fmt.reset}${fmt.txt.blue} INFO ${fmt.reset}] ${msg}${fmt.reset}`)
}

const log = (msg) => {
    console.log(`${fmt.reset}[${fmt.time}] [${fmt.txt.lGreen}LOG${fmt.reset}] » ${msg}${fmt.reset}`);
}

const warn = (msg) => {
    console.log(`${fmt.reset}[${fmt.txt.yellow}WARN${fmt.reset}] ${msg}${fmt.reset}`);
}

module.exports = {
    info,
    log,
    warn
};