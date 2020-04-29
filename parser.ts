import fs from "fs";
import path from "path";
import peg from "pegjs";

const grammarPath = path.resolve(__dirname, "..", "time-ranges.pegjs");
const grammar = fs.readFileSync(grammarPath, "utf-8");
export const parser = peg.generate(grammar);
