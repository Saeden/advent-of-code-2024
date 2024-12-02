import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  const reports: number[][] = [];
  for (const line of data) {
    const levels: number[] = [];
    let numString = "";
    for (const char of line) {
      if (char === ' ') {
        const num = parseInt(numString);
        numString = "";
        levels.push(num)
      } else {
        numString += char;
      };
    };
    const num = parseInt(numString);
    if (!isNaN(num)) {
      levels.push(num)
      reports.push(levels);
    }
  };


  let safeReports = 0;
  for (const report of reports) {
    const [isSafe, index] = isSafeAndIndex(report);
    if (isSafe) safeReports++;
    else {
      const report1 = report.slice(0, index - 1).concat(report.slice(index));
      const report2 = report.slice(0, index).concat(report.slice(index + 1));
      const isSafe1 = isSafeAndIndex(report1)[0];
      const isSafe2 = isSafeAndIndex(report2)[0];
      if (isSafe1) {
        console.log("Report was not safe but is safe now: \n" + report)
        console.log("report1")
        console.log(report1);
        safeReports++;
      } else if (isSafe2) {
        console.log("Report was not safe but is safe now: \n" + report)
        console.log("report2")
        console.log(report2);
        safeReports++;
      }
    }
  }
  return safeReports;
}

function isSafeAndIndex(report: number[]): [boolean, number] {
  let ascending = false;
  let descending = false;
  if (report[1] > report[0]) {
    ascending = true;
  } else if (report[1] < report[0]) {
    descending = true;
  } else {
    return [false, 1];
  }
  for (let i = 1; i < report.length; i++) {
    if (report[i] < report[i - 1] && ascending) {
      return [false, i]
    } else if (report[i] > report[i - 1] && descending) {
      return [false, i]
    } else if (report[i] === report[i - 1]) {
      return [false, i]
    }
    const diff = Math.max(report[i], report[i - 1]) - Math.min(report[i], report[i - 1]);
    if (diff === 0 || diff < -3 || diff > 3) {
      return [false, i]
    }
  }
  return [true, -1];
}

await runSolution(day2b);
