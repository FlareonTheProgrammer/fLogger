/// <reference types="node" />
import * as fs from "fs";
import * as lutil from "./lutil";
export declare class FloggerClass {
    constructor();
    private label;
    private timestamp;
    private generateID;
    floggerNewSession: string;
    protected core(options: lutil.CoreOptions): void;
    setLogDir(directory: fs.PathLike): void;
    info(msg: string): void;
    log(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    /**
     * custom
     */
    custom(options: lutil.CustomOptions): void;
}
export declare const flog: FloggerClass;
