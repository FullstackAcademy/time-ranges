import { parser } from "./parser";
import moment from "moment";

interface Time {
  hour: number,
  minute: number
}

interface TimeRange {
  start: Time,
  end: Time
}

interface MomentRange {
  start: moment.Moment,
  end: moment.Moment
}

export function generateTimeRanges(
  timeString : string,
  forMoment : moment.Moment = moment()
): MomentRange[] {
  forMoment = forMoment.startOf('day');
  return parser.parse(timeString).map((range : TimeRange) => {
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

export function inspectTimeString(timeString:string) {
  console.log("========================");
  console.log(`timeString: \n${timeString}`);
  const ranges = generateTimeRanges(timeString);
  for (const range of ranges) {
    console.log(`
From: ${range.start.format("LLL")}
  To: ${range.end.format("LLL")}`);
  }
}
