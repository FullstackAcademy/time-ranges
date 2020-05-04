"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var parser_1 = require("./parser");
var moment_1 = __importDefault(require("moment"));
function generateTimeRanges(timeString, forMoment) {
    if (forMoment === void 0) { forMoment = moment_1["default"](); }
    forMoment = forMoment.startOf('day');
    return parser_1.parser.parse(timeString).map(function (range) {
        var start = forMoment.clone();
        start.set("hour", range.start.hour);
        start.set("minute", range.start.minute);
        var end = forMoment.clone();
        end.set("hour", range.end.hour);
        end.set("minute", range.end.minute);
        return {
            start: start,
            end: end
        };
    });
}
exports.generateTimeRanges = generateTimeRanges;
function inspectTimeString(timeString) {
    console.log("========================");
    console.log("timeString: \n" + timeString);
    var ranges = generateTimeRanges(timeString);
    for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
        var range = ranges_1[_i];
        console.log("\nFrom: " + range.start.format("LLL") + "\n  To: " + range.end.format("LLL"));
    }
}
exports.inspectTimeString = inspectTimeString;
