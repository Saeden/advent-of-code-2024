import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  //console.log(data);
  const list1: number[] = [];
  const list2: number[] = [];
  for (const line of data) {
    let endOfFirstNum = false;
    let num1: number = 0;
    let num2: number = 0;
    for (const char of line) {
      //console.log("Char: " + char);
      const tryIntoNum = parseInt(char);
      //console.log("Try into NUM: " + tryIntoNum);
      if (char === ' ') {
        endOfFirstNum = true;
      } else if (!isNaN(tryIntoNum) && !endOfFirstNum) {
        num1 *= 10;
        num1 += tryIntoNum;
        //console.log("NUM1!: " + num1);
      } else if (!isNaN(tryIntoNum)){
        num2 *= 10;
        num2 += tryIntoNum;
        //console.log("NUM2!: " + num2);
      }
    }
    //console.log("NUM1: " + num1);
    //console.log("NUM2: " + num2);
    list1.push(num1)
    //console.log("LIST1: " + list1);
    list2.push(num2)
    //console.log("LIST2: " + list2);
  };
  const sortList1 = list1.sort();
  const sortList2 = list2.sort();
  let totalDistance = 0;
  for (let i = 0; i < sortList1.length; i++) {
    //console.log("MAX: " + Math.max(sortList1[i], sortList2[i]))
    //console.log("MIN: " + Math.min(sortList1[i], sortList2[i]))
    const diff = Math.max(sortList1[i], sortList2[i]) - Math.min(sortList1[i], sortList2[i]);
    totalDistance += diff;
  }
  //console.log(list1);
  //console.log(list2);
  console.log(totalDistance);
  return totalDistance;
}

await runSolution(day1a);
