import * as rd from 'readline';
import * as fs from 'fs';

const input = fs.createReadStream('src/day12/input');
const reader = rd.createInterface(input);

enum Direction {
    North = 0,
    East = 1,
    South = 2,
    West = 3
}

export async function part1() {
    let east = 0;
    let north = 0;
    let direction = Direction.East;

    for await (const line of reader) {
        const match = line.match(/(?<cmd>[A-Z]{1})(?<val>\d+)/);
        const cmd = match?.groups?.cmd ?? '';
        const value = parseInt(match?.groups?.val ?? '');

        switch (cmd) {
            case 'N':
                north += value;
                break;
            case 'S':
                north -= value;
                break;
            case 'E':
                east += value;
                break;
            case 'W':
                east -= value;
                break;
            case 'L':
            case 'R':
                direction = rotate(direction, cmd, value);
                break;
            case 'F':
                switch (direction) {
                    case Direction.North:
                        north += value;
                        break;
                    case Direction.South:
                        north -= value;
                        break;
                    case Direction.East:
                        east += value;
                        break;
                    case Direction.West:
                        east -= value;
                        break;
                }
        }
    }

    console.log(Math.abs(north) + Math.abs(east));
}

export async function part2() {
    let shipEast = 0;
    let shipNorth = 0;
    let wpEast = 10;
    let wpNorth = 1;
    let direction = Direction.East;

    for await (const line of reader) {
        const match = line.match(/(?<cmd>[A-Z]{1})(?<val>\d+)/);
        const cmd = match?.groups?.cmd ?? '';
        const value = parseInt(match?.groups?.val ?? '');

        switch (cmd) {
            case 'N':
                wpNorth += value;
                break;
            case 'S':
                wpNorth -= value;
                break;
            case 'E':
                wpEast += value;
                break;
            case 'W':
                wpEast -= value;
                break;
            case 'R':
                switch (value) {
                    case 90:
                        const tmp2 = wpEast;
                        wpEast = wpNorth;
                        wpNorth = -tmp2;
                        break;
                    case 180:
                        wpEast = -wpEast
                        wpNorth = -wpNorth
                        break;
                    case 270:
                        const tmp1 = wpEast;
                        wpEast = -wpNorth;
                        wpNorth = tmp1;
                        break;
                }
                break;
            case 'L':
                switch (value) {
                    case 90:
                        const tmp1 = wpEast;
                        wpEast = -wpNorth;
                        wpNorth = tmp1;
                        break;
                    case 180:
                        wpEast = -wpEast
                        wpNorth = -wpNorth
                        break;
                    case 270:
                        const tmp2 = wpEast;
                        wpEast = wpNorth;
                        wpNorth = -tmp2;
                        break;
                }
                break;
            case 'F':
                shipNorth += wpNorth * value;
                shipEast += wpEast * value;
                break;
        }
    }

    console.log(Math.abs(shipNorth) + Math.abs(shipEast));
}

function rotate(current: Direction, direction: string, degrees: number): Direction {
    if (direction === 'R') {
        return mod((current + (degrees / 90)), 4);
    }
    
    return mod((current - (degrees / 90)), 4);
}

function mod(a: number, b: number): number {
    return ((a % b) + b) % b;
}
