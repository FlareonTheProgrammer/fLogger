import * as fs from "fs";

export type Color =
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'gray'
	| 'grey'
	| 'blackBright'
	| 'redBright'
	| 'greenBright'
	| 'yellowBright'
	| 'blueBright'
	| 'magentaBright'
	| 'cyanBright'
	| 'whiteBright';

/**
 * Logger options for initializing the class
 */
export interface LoggerOptions {
    save?: {
        logDir: fs.PathLike,
        /**
         * This property may *say* it's a string, but not just anything can be in it.
         * The following regex will be used to enforce typical username standards (alnum, "-", "_")
         * /[^a-zA-Z0-9_-]+/g
         */
        appName?: string,
        /**
         * Whether or not to automatically start a new log file when a date change is detected
         */
        splitOnDateChange?: boolean,
        /**
         * Choose to disable the internal logger for Flogger
         */
        disableInternalLog?: boolean
    }
}

export function enforceFilenameRegex(input: string) : string {
    return input.replace(/[^a-zA-Z0-9_-]+/g, "");
}

/**
 * Options for the "core" method
 */
export interface CoreOptions {
    /**
     * The console method to be used,
     * Defaults to "log"
     */  
    method: "info" | "log" | "warn" | "error" | "debug";
  
    /**
     * The title of the log message. Appears in square brackets after the timestamp)
     */
    title: string;
  
    /**
     * The color of the title, must be one of the colors within the type "Color"
     */
    color?: Color;
  
    /**
     * The contents of the message. Should *probably* be a string, but... don't let that stop you from breaking shit
     */
    msg: unknown;
}
  
/**
 * Custom logger options, type for message is enforced
 */
export interface CustomOptions extends CoreOptions {
    /**
     * The contents of the message. Must be a string
     */
    msg: string;
}