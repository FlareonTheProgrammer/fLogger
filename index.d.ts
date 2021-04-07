/// <reference types="node" />
import * as fs from "fs";
declare class FloggerClass {
    constructor();
    fmt: {
        reset: string;
        bright: string;
        dim: string;
        underline: string;
        blink: string;
        reverse: string;
        hidden: string;
        txt: {
            dRed: string;
            dGreen: string;
            dYellow: string;
            dBlue: string;
            dMagenta: string;
            dCyan: string;
            red: string;
            green: string;
            yellow: string;
            blue: string;
            magenta: string;
            cyan: string;
            lRed: string;
            lGreen: string;
            lYellow: string;
            lBlue: string;
            lMagenta: string;
            lCyan: string;
            white: string;
            lGrey: string;
            grey: string;
            dGrey: string;
            black: string;
        };
        bg: {
            red: string;
            green: string;
            yellow: string;
            blue: string;
            magenta: string;
            cyan: string;
            white: string;
            black: string;
        };
        noBleed: (input: string) => string;
    };
    timestamp(): string;
    label(input: string, color?: string): string;
    private generateID;
    floggerNewSession: string;
    protected core: (options: any) => void;
    setLogDir(directory: fs.PathLike): void;
    info: (msg: string) => void;
    log: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
    custom: (options: any) => void;
}
declare const _default: {
    FloggerClass: typeof FloggerClass;
};
export = _default;
