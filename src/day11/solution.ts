import * as fs from 'fs';
import * as rd from 'readline';

const input = fs.createReadStream('src/day11/input');
const reader = rd.createInterface(input);

export async function part1() {
    const layout = new Array<string>();
    for await (const line of reader) {
        layout.push(line.trim());
    }

    let first = layout;
    let second = new Array<string>();
    while (true) {
        second = epoch(first);
        if (layoutsEqual(second, first)) break;
        first = second;
    }

    console.log(countOccupiedSeats(second));
}

export async function part2() {
    const layout = new Array<string>();
    for await (const line of reader) {
        layout.push(line.trim());
    }

    let first = layout;
    let second = new Array<string>();
    while (true) {
        second = epoch2(first);
        if (layoutsEqual(second, first)) break;
        first = second;
    }

    console.log(countOccupiedSeats(second));
}

function countOccupiedSeats(layout: Array<string>): number {
    let occupied = 0;
    for (let j = 0; j < layout.length; j++) {
        for (let i = 0; i < layout[j].length; i++) {
            if (layout[j][i] === '#') occupied++
        }
    }

    return occupied;
}

function epoch(input: Array<string>): Array<string> {
    const result = new Array<string>(...input);

    for (let j = 0; j < input.length; j++) {
        for (let i = 0; i < input[j].length; i++) {
            if (input[j][i] === 'L' && countAdjacentOccupied(input, i, j) === 0) {
                 result[j] = replaceCharAt(result[j], i, '#');
            }
            if (input[j][i] === '#' && countAdjacentOccupied(input, i, j) >= 4) {
                result[j] = replaceCharAt(result[j], i, 'L');
            }
        }
    }

    return result;
}

function epoch2(input: Array<string>): Array<string> {
    const result = new Array<string>(...input);

    for (let j = 0; j < input.length; j++) {
        for (let i = 0; i < input[j].length; i++) {
            if (input[j][i] === 'L' && countVisibleOccupied(input, i, j) === 0) {
                result[j] = replaceCharAt(result[j], i, '#');
            }

            if (input[j][i] === '#' && countVisibleOccupied(input, i, j) >= 5) {
                result[j] = replaceCharAt(result[j], i, 'L');
            }
        }
    }

    return result;
}

function layoutsEqual(first: Array<string>, second: Array<string>): boolean {
    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) return false;
    }

    return true;
}

function replaceCharAt(str: string, i: number, chr: string): string {
    return `${str.substr(0, i)}${chr}${str.substr(i + 1)}`;
}

function countAdjacentOccupied(layout: Array<string>, i: number, j: number): number {
    let result = 0;

    if (i > 0) {
        if (layout[j][i - 1] === '#') result++;
        if (j > 0 && layout[j - 1][i - 1] === '#') result++;
        if (j < layout.length - 1 && layout[j + 1][i - 1] === '#') result++;
    }

    if (i < layout[j].length - 1) {
        if (layout[j][i + 1] === '#') result++;
        if (j > 0 && layout[j - 1][i + 1] === '#') result++;
        if (j < layout.length - 1 && layout[j + 1][i + 1] === '#') result++;
    }

    if (j > 0 && layout[j - 1][i] === '#') result++;
    if (j < layout.length - 1 && layout[j + 1][i] === '#') result++;

    return result;    
}

function countVisibleOccupied(layout: Array<string>, i: number, j: number): number {
    let result = 0;

    for (let ii = i + 1; ii < layout[j].length; ii++) {
        if (layout[j][ii] === 'L') break;
        if (layout[j][ii] === '#') {
            result++;
            break;
        }
    }

    for (let ii = i - 1; ii >= 0; ii--) {
        if (layout[j][ii] === 'L') break;
        if (layout[j][ii] === '#') {
            result++;
            break;
        }
    }

    for (let jj = j + 1; jj < layout.length; jj++) {
        if (layout[jj][i] === 'L') break;
        if (layout[jj][i] === '#') {
            result++;
            break;
        }
    }

    for (let jj = j - 1; jj >= 0; jj--) {
        if (layout[jj][i] === 'L') break;
        if (layout[jj][i] === '#') {
            result++;
            break;
        }
    }

    let ii = i + 1;
    let jj = j + 1;
    while (jj < layout.length && ii < layout[jj].length) {
        if (layout[jj][ii] === 'L') break;
        if (layout[jj][ii] === '#') {
            result++;
            break;
        }

        ii++;
        jj++;
    }

    ii = i - 1;
    jj = j - 1;
    while (jj >= 0 && ii >= 0) {
        if (layout[jj][ii] === 'L') break;
        if (layout[jj][ii] === '#') {
            result++;
            break;
        }

        ii--;
        jj--;
    }

    ii = i + 1;
    jj = j - 1;
    while (jj >= 0 && ii < layout[jj].length) {
        if (layout[jj][ii] === 'L') break;
        if (layout[jj][ii] === '#') {
            result++;
            break;
        }

        ii++;
        jj--;
    }

    ii = i - 1;
    jj = j + 1;
    while (jj < layout.length && ii >= 0) {
        if (layout[jj][ii] === 'L') break;
        if (layout[jj][ii] === '#') {
            result++;
            break;
        }

        ii--;
        jj++;
    }

    return result;
}