import * as rd from 'readline';
import * as fs from 'fs';

const input = fs.createReadStream('src/day3/input');
const reader = rd.createInterface(input);

interface Point {
    x: number;
    y: number;
}

export async function part1() {
    const data: Array<string> = [];

    for await (const line of reader) {
        data.push(line);
    }

    const trees = traverseWithSlope(data, {x: 3, y: 1});

    console.log(trees);
}


export async function part2() {
    const data: Array<string> = [];

    for await (const line of reader) {
        data.push(line);
    }

    const slopes: Array<Point> = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2}
    ];

    const trees = slopes
        .map((slope) => traverseWithSlope(data, slope))
        .reduce((sum, trees) => sum * trees, 1);

    console.log(trees);
}

function traverseWithSlope(data: Array<string>, slope: Point): number {
let trees = 0;
    const position: Point = {x: 0, y: 0};
    while (true) {
        if (position.y + 1 > data.length) break;
        if (position.x + 1 > data[0].length) {
            position.x = position.x % data[0].length;
        }

        if (data[position.y][position.x] === '#') trees++;

        position.x += slope.x;
        position.y += slope.y;
    }
    
    return trees;
}
