import * as rd from 'readline';
import * as fs from 'fs';

const input = fs.createReadStream('src/day10/input');
const reader = rd.createInterface(input);

export async function part1() {
    const adapters = new Array<number>();

    for await (const line of reader) {
        adapters.push(parseInt(line));
    }

    adapters.sort((a, b) => a - b);

    let diff1 = 0;
    let diff3 = 0;
    for (let i = 0; i < adapters.length - 1; i++) {
        if (adapters[i + 1] - adapters[i] === 1) diff1++;
        if (adapters[i + 1] - adapters[i] === 3) diff3++;
    }

    diff1++;
    diff3++;

    console.log(diff1 * diff3);
}

export async function part2() {
    const adapters = new Array<number>();

    for await (const line of reader) {
        adapters.push(parseInt(line));
    }

    adapters.sort((a, b) => a - b);
    adapters.unshift(0);
    adapters.push(adapters[adapters.length - 1] + 3);

    console.log(possibleConnections(adapters, 0, adapters[adapters.length - 1]));
}

const memo = new Map<number, number>();

function possibleConnections(adapters: Array<number>, currentAdapter: number, destinationJolts: number): number {
    if (adapters[currentAdapter] === destinationJolts) return 1;

    if (memo.has(currentAdapter)) return memo.get(currentAdapter) ?? 0;

    let combinations = 0;
    for (let i = currentAdapter + 1; i < adapters.length; i++) {
        if (adapters[i] - adapters[currentAdapter] <= 3) {
            combinations += possibleConnections(adapters, i, destinationJolts);
        } else {
            break;
        }
    }

    memo.set(currentAdapter, combinations);

    return combinations;
}