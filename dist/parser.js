"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pegjs_1 = __importDefault(require("pegjs"));
var grammarPath = path_1["default"].resolve(__dirname, "..", "time-ranges.pegjs");
var grammar = fs_1["default"].readFileSync(grammarPath, "utf-8");
exports.parser = pegjs_1["default"].generate(grammar);
