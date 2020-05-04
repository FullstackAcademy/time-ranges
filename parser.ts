import peg from "pegjs";

const grammar = `start = timeranges

timeranges "list of time ranges" = _ lead:timerange trailing:(delimeter timerange _)* _ {
  return [lead, ...trailing.map(([delimeter, timerange]) => timerange)];
}

delimeter "list delimeter" = _ "," _ { return; }

timerange "time range" = start:time "-" end:time {
  return { start, end };
}

time "time " = hour:number ":" minute:number period:period {
  let realHour;
  if (hour === 12 && period === "am") {
    realHour = 0;
  }
  else if (hour === 12 && period === "pm") {
    realHour = hour;
  }
  else if (period === "pm") {
    realHour = hour + 12;
  }
  else {
    realHour = hour;
  }

  return { hour: realHour, minute };
}

period "period" = am / pm

am "am" = "am" { return "am"; }

pm "pm" = "pm" { return "pm"; }

number "number" = lead:[0-9] trailing:[0-9]* {
  const text = [lead, ...trailing].join("");
  const number = Number(text);
  return number;
}

_ "whitespace" = " "*`
export const parser = peg.generate(grammar);
