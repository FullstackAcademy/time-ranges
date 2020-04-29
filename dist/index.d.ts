import moment from "moment";
interface MomentRange {
    start: moment.Moment;
    end: moment.Moment;
}
export declare function generateTimeRanges(timeString: string, forMoment?: moment.Moment): [MomentRange];
export declare function inspectTimeString(timeString: string): void;
export {};
