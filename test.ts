import { parser } from "./parser";
import assert from "assert";

const tests = {
  "parses single time ranges": () => {
    const result = parser.parse("10:00am-11:00am");
    assert.deepEqual(result, [
      {
        start: { hour: 10, minute: 0 },
        end: { hour: 11, minute: 0 }
      }
    ]);
  },
  "parses minutes": () => {
    const result = parser.parse("10:35am-11:00am");
    assert.deepEqual(result, [
      {
        start: { hour: 10, minute: 35 },
        end: { hour: 11, minute: 0 }
      }
    ]);
  },
  "parses sequences of time ranges": () => {
    const result = parser.parse("8:00am-9:00am, 10:00am-11:00am");
    assert.deepEqual(result, [
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
  "tolerates whitespace": () => {
    const result = parser.parse("  8:00am-9:00am  , 10:00am-11:00am  ");
    assert.deepEqual(result, [
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

const results = [];
let passing = 0;
let failing = 0;

for (const [test, testFn] of Object.entries(tests)) {
  try {
    testFn();
    results.push({ passed: true, test });
    passing++;
  } catch (error) {
    results.push({ passed: false, test: test, error });
    failing++;
  }
}

results.forEach((result, index) => {
  const icon = result.passed ? "✅" : "🚨";
  console.log(
    `${icon} ${(index + 1)
      .toString()
      .padStart(results.length.toString().length, " ")}) ${result.test}`
  );
  if (result.error) {
    console.log(result.error.message);
  }
});

console.log(`${passing} Passing`);
console.log(`${failing} Failing`);

if (failing > 0) {
  process.exit(1);
}
