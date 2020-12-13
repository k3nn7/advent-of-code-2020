import * as rd from 'readline';
import * as fs from 'fs';

const input = fs.createReadStream('./src/day9/input');
const reader = rd.createInterface(input);

export async function part1() {
    const numbers = new Array<number>();
    let i = 0;
    for await (const line of reader) {
        const num = parseInt(line);
        numbers.push(num);
        i++;

        if (i > 25) {
            if (!hasSum(numbers.slice(i - 26, i - 1), num)) {
                console.log(num);
                return;
            }
        }
    }
}

export async function part2() {
    const expectedSum = 373803594;
    const numbers = new Array<number>();
    
    for await (const line of reader) {
        numbers.push(parseInt(line));
    }

    for (let i = 0; i < numbers.length - 1; i++) {
        let sum = numbers[i];
        let smallest = numbers[i];
        let largest = numbers[i];

        for (let j = i + 1; j < numbers.length; j++) {
            sum += numbers[j];
            if (numbers[j] > largest) largest = numbers[j];
            if (numbers[j] < smallest) smallest = numbers[j];
            if (sum > expectedSum) break;
            if (sum === expectedSum) {
                console.log(smallest + largest);
                return;
            }
        }
    }
}

function hasSum(array: Array<number>, expectedSum: number): boolean {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === expectedSum) return true;
        }
    }

    return false;
}