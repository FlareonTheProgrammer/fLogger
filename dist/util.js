"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceFilenameRegex = void 0;
function enforceFilenameRegex(input) {
    return input.replace(/[^a-zA-Z0-9_-]+/g, "");
}
exports.enforceFilenameRegex = enforceFilenameRegex;
