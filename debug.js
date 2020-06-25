const flogger = require("./");

flogger.setLogDir("./logs")

flogger.log("Test");
flogger.custom(
    {
        hey: "oof"
    }
);