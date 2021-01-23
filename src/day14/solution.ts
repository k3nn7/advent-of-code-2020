import * as rd from 'readline';
import * as fs from 'fs';

const input = fs.createReadStream('src/day14/input');
const reader = rd.createInterface(input);

interface op {
    command: string;
    address: number;
    value: number;
}

interface bigNumber {
    high: number;
    low: number;
}

export async function part1() {
    const values = new Array<bigNumber>();
    const lowMask = Math.pow(2, 18) - 1;
    const highValueDivider = Math.pow(2, 18);

    let highAndMask = 0;
    let lowAndMask = 0;
    let highOrMask = 0;
    let lowOrMask = 0;

    for await (const line of reader) {
        const match = line.match(/(?<cmd>[a-z]+)(\[(?<address>\d+)\])? = (?<val>.+)/);
        const cmd = match?.groups ? match.groups['cmd'] : '';

        switch (cmd) {
            case 'mask':
                const mask = match?.groups ? match.groups['val'] : '';

                highAndMask = 0;
                lowAndMask = 0;
                highOrMask = 0;
                lowOrMask = 0;
                for (let i = 18; i < 36; i++) {
                    switch (mask[i]) {
                        case 'X':
                            lowOrMask |= 0;
                            lowAndMask |= 1;
                            break;
                        case '1':
                            lowOrMask |= 1;
                            lowAndMask |= 1;
                            break;
                        case '0':
                            lowOrMask |= 0;
                            lowAndMask |= 0;
                            break;
                    }

                    lowOrMask <<= 1;
                    lowAndMask <<= 1;
                }

                lowOrMask >>= 1;
                lowAndMask >>= 1;

                for (let i = 0; i < 18; i++) {
                    switch (mask[i]) {
                        case 'X':
                            highOrMask |= 0;
                            highAndMask |= 1;
                            break;
                        case '1':
                            highOrMask |= 1;
                            highAndMask |= 1;
                            break;
                        case '0':
                            highOrMask |= 0;
                            highAndMask |= 0;
                            break;
                    }

                    highOrMask <<= 1;
                    highAndMask <<= 1;
                }

                highOrMask >>= 1;
                highAndMask >>= 1;

                break;

            case 'mem':
                const address = parseInt(match?.groups ? match.groups['address'] : '');
                const value = parseInt(match?.groups ? match.groups['val'] : '');
                values[address] = {
                    high: ((Math.floor(value / highValueDivider)) | highOrMask) & highAndMask,
                    low: ((lowMask & value) | lowOrMask) & lowAndMask
                };
                break
        }
    }

    let sum = 0;

    for (let i = 0; i < values.length; i++) {
        if (values[i] !== undefined) {
            const val = values[i].low + values[i].high * highValueDivider;
            sum += val;    
        }
    }

    console.log(sum);
}

export async function part2() {

}