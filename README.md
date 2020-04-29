# A library to parse time ranges

The module `index.ts` exports two functions:

## `generateTimeRanges`

Generate time ranges accepts two arguments, a `timeString` and a `moment` object that will be used as the calendar date of the time ranges. (Defaults to `moment()`)

`generateTimeRanges returns [MomentRange]`, specified as:

```js

type MomentRange = {
  start: moment.Moment,
  end: moment.Moment
}
```

## `inspectTimeString`

Useful for inspecting the output of a `timeString`. Will print a human readable output of a generated set of ranges.

example:

```js
inspectTimeString('9:00am-10:00am, 12:00pm-5:30pm')
```

Will print:
```
========================
timeString:
9:00am-10:00am, 12:00pm-5:30pm

From: April 29, 2020 9:00 AM
  To: April 29, 2020 10:00 AM

From: April 29, 2020 12:00 PM
  To: April 29, 2020 5:30 PM
```
