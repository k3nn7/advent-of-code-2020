import * as rd from 'readline';
import * as fs from 'fs';
import { time } from 'console';

const input = fs.createReadStream('src/day13/input');
const reader = rd.createInterface(input);

export async function part1() {
    const timestampLine = await getLine(reader);
    
    const timestamp = Number.parseInt(timestampLine);
    const buses = await getLine(reader);

    const times = buses.split(',')
        .filter(value => value !== 'x')
        .map(value => parseInt(value))
        .map(value => ({id: value, waitTime: value - (timestamp % value)}))
        .sort((a, b) => a.waitTime - b.waitTime);

    console.log(times[0].id * times[0].waitTime);
}

export async function part2() {
    await getLine(reader);
    const buses = await getLine(reader);

    const times = buses.split(',')
        .map((value, index) => ({id: value, offset: index}))
        .filter(value => value.id !== 'x')
        .map(value => ({id: Number.parseInt(value.id), offset: value.offset}))

    console.log(times);
}

function isExpected(t: number, values: Array<{id: number, offset: number}>): boolean {
    for (const v of values) {
        if ( (v.id - (t % v.id) !== v.offset) ) {
            return false;
        }
    }

    return true;
}

async function getLine(reader: rd.Interface): Promise<string> {
    return new Promise<string>(resolve => 
        reader.once('line', resolve)
    );
}