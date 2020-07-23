/// <reference types="node" />
import * as fs from "fs";
declare function setLogDir(directory: fs.PathLike): void;
declare const _default: {
    custom: (options: any) => void;
    info: (msg: string) => void;
    log: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
    setLogDir: typeof setLogDir;
};
export = _default;
