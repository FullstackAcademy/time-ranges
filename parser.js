const fs = require("fs");
const peg = require("pegjs");
const parser = peg.generate(fs.readFileSync("./time-ranges.pegjs", "utf-8"));

module.exports.parser = parser
