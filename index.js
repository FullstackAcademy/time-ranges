const parser = require("./parser").parser;
const moment = require("moment");


function generateTimeRanges(timeString, forMoment = moment().startOf("day")) {
  return parser.parse(timeString).map(range => {
    const start = forMoment.clone();
    start.set("hour", range.start.hour);
    start.set("minute", range.start.minute);

    const end = forMoment.clone();
    end.set("hour", range.end.hour);
    end.set("minute", range.end.minute);

    return {
      start,
      end
    };
  });
}

function inspectTimeString(timeString) {
  console.log("========================");
  console.log(`timeString: \n${timeString}`);
  console.log();
  const ranges = generateTimeRanges(timeString);
  for (const range of ranges) {
    console.log(`
From: ${range.start.format("LLL")}
  To: ${range.end.format("LLL")}
    `);
  }
}

module.exports.generateTimeRanges = generateTimeRanges;
module.exports.inspectTimeString = inspectTimeString;

