/// <reference types="node" />
import * as fs from "fs";
import * as util from "./util";
export declare class FloggerClass {
    logDir?: fs.PathLike;
    logfile?: string;
    constructor(loggerOptions?: util.LoggerOptions);
    private label;
    private timestamp;
    private generateID;
    floggerNewSession: string;
    protected core(options: util.CoreOptions): void;
    info(msg: string): void;
    log(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    /**
     * custom
     */
    custom(options: util.CustomOptions): void;
}
