"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var parser_1 = require("./parser");
var assert_1 = __importDefault(require("assert"));
var tests = {
    "parses single time ranges": function () {
        var result = parser_1.parser.parse("10:00am-11:00am");
        assert_1["default"].deepEqual(result, [
            {
                start: { hour: 10, minute: 0 },
                end: { hour: 11, minute: 0 }
            }
        ]);
    },
    "parses minutes": function () {
        var result = parser_1.parser.parse("10:35am-11:00am");
        assert_1["default"].deepEqual(result, [
            {
                start: { hour: 10, minute: 35 },
                end: { hour: 11, minute: 0 }
            }
        ]);
    },
    "parses sequences of time ranges": function () {
        var result = parser_1.parser.parse("8:00am-9:00am, 10:00am-11:00am");
        assert_1["default"].deepEqual(result, [
            {
                start: { hour: 8, minute: 0 },
                end: { hour: 9, minute: 0 }
            },
            {
                start: { hour: 10, minute: 0 },
                end: { hour: 11, minute: 0 }
            }
        ]);
    },
    "tolerates whitespace": function () {
        var result = parser_1.parser.parse("  8:00am-9:00am  , 10:00am-11:00am  ");
        assert_1["default"].deepEqual(result, [
            {
                start: { hour: 8, minute: 0 },
                end: { hour: 9, minute: 0 }
            },
            {
                start: { hour: 10, minute: 0 },
                end: { hour: 11, minute: 0 }
            }
        ]);
    }
};
var results = [];
var passing = 0;
var failing = 0;
for (var _i = 0, _a = Object.entries(tests); _i < _a.length; _i++) {
    var _b = _a[_i], test = _b[0], testFn = _b[1];
    try {
        testFn();
        results.push({ passed: true, test: test });
        passing++;
    }
    catch (error) {
        results.push({ passed: false, test: test, error: error });
        failing++;
    }
}
results.forEach(function (result, index) {
    var icon = result.passed ? "✅" : "🚨";
    console.log(icon + " " + (index + 1)
        .toString()
        .padStart(results.length.toString().length, " ") + ") " + result.test);
    if (result.error) {
        console.log(result.error.message);
    }
});
console.log(passing + " Passing");
console.log(failing + " Failing");
if (failing > 0) {
    process.exit(1);
}
