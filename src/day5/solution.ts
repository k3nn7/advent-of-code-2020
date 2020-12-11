import * as rd from 'readline';
import * as fs from 'fs';

const input = fs.createReadStream('src/day5/input');
const reader = rd.createInterface(input);

export async function part1() {
    let maxId = Number.MIN_VALUE;
    for await (const line of reader) {
        const {id} = parseInput(line);
        if (id > maxId) maxId = id;
    }

    console.log(maxId);
}

export async function part2() {
    const ids: Array<number> = [];
    var maxId = Number.MIN_VALUE;
    for await (const line of reader) {
        const {id} = parseInput(line);
        ids.push(id);
    }

    ids.sort((a, b) => a - b);

    for (let i = 0; i < ids.length; i++) {
        if (ids[i + 1] !== ids[i] + 1) {
            console.log(ids[i-1], ids[i], ids[i+1])
        }
    }
}

export function parseInput(input: string): {row: number, column: number, id: number} {
    let rowRange = {min: 0, max: 127};
    for (let i = 0; i < 7; i++) {
        rowRange = getRowRange(input[i], rowRange.min, rowRange.max);
    }

    let columnRange = {min: 0, max: 7};
    for (let i = 7; i < 10; i++) {
        columnRange = getColumnRange(input[i], columnRange.min, columnRange.max);
    }

    return {row: rowRange.min, column: columnRange.min, id: rowRange.min * 8 + columnRange.min};
}

export function getRowRange(char: string, min: number, max: number): {min: number, max: number} {
    if (char === 'F') {
        return {min: min, max: Math.floor(min + (max - min) / 2)};
    }

    return {min: Math.floor(min + (max - min) / 2 + 1), max: max};
}

export function getColumnRange(char: string, min: number, max: number): {min: number, max: number} {
    if (char === 'L') {
        return {min: min, max: Math.floor(min + (max - min) / 2)};
    }

    return {min: Math.floor(min + (max - min) / 2 + 1), max: max};
}