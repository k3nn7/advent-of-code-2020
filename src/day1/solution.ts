import * as rd from 'readline';
import * as fs from 'fs';

const expectedSum = 2020;
const input = fs.createReadStream('src/day1/input');
const reader = rd.createInterface(input);

async function part1() {
    let data: Array<number> = [];
  
    for await (const line of reader) {
      data.push(Number.parseInt(line))
    }
  
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i] + data[j] === expectedSum) {
        console.log(data[i] * data[j]);
        return;
        }
      }
    }
  }

async function part2() {
  let data: Array<number> = [];

  for await (const line of reader) {
    data.push(Number.parseInt(line))
  }

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      for (let k = j + 1; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === expectedSum) {
          console.log(data[i] * data[j] * data[k]);
          return;
        }
      }
    }
  }
}

part1();
part2();
