"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pegjs_1 = __importDefault(require("pegjs"));
var grammar = "start = timeranges\n\ntimeranges \"list of time ranges\" = _ lead:timerange trailing:(delimeter timerange _)* _ {\n  return [lead, ...trailing.map(([delimeter, timerange]) => timerange)];\n}\n\ndelimeter \"list delimeter\" = _ \",\" _ { return; }\n\ntimerange \"time range\" = start:time \"-\" end:time {\n  return { start, end };\n}\n\ntime \"time \" = hour:number \":\" minute:number period:period {\n  let realHour;\n  if (hour === 12 && period === \"am\") {\n    realHour = 0;\n  }\n  else if (hour === 12 && period === \"pm\") {\n    realHour = hour;\n  }\n  else if (period === \"pm\") {\n    realHour = hour + 12;\n  }\n  else {\n    realHour = hour;\n  }\n\n  return { hour: realHour, minute };\n}\n\nperiod \"period\" = am / pm\n\nam \"am\" = \"am\" { return \"am\"; }\n\npm \"pm\" = \"pm\" { return \"pm\"; }\n\nnumber \"number\" = lead:[0-9] trailing:[0-9]* {\n  const text = [lead, ...trailing].join(\"\");\n  const number = Number(text);\n  return number;\n}\n\n_ \"whitespace\" = \" \"*";
exports.parser = pegjs_1["default"].generate(grammar);
