import fs from "fs";
import peg from "pegjs";

const grammar = fs.readFileSync("./time-ranges.pegjs", "utf-8");
export const parser = peg.generate(grammar);
