import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
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
    let ascending = false;
    let descending = false;
    if (report[1] > report[0]) {
      ascending = true;
    } else if (report[1] < report[0]) {
      descending = true;
    } else {
      continue;
    }
    let unsafeReport = false;
    for (let i = 1; i < report.length; i++) {
      if (report[i] < report[i - 1] && ascending) {
        unsafeReport = true;
        break;
      } else if (report[i] > report[i - 1] && descending) {
        unsafeReport = true;
        break;
      } else if (report[i] === report[i - 1]) {
        unsafeReport = true;
        break;
      }
      const diff = Math.max(report[i], report[i - 1]) - Math.min(report[i], report[i - 1]);
      if (diff === 0 || diff < -3 || diff > 3) {
        unsafeReport = true;
        break;
      }
    }
    if (!unsafeReport) {
      console.log("This report was safe: " + report)
      safeReports++;
    }
  }

  return safeReports;
}

await runSolution(day2a);
