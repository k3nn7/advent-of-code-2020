import * as rd from 'readline';
import * as fs from 'fs';

const format = /(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]+)/;
const input = fs.createReadStream('src/day2/input');
const reader = rd.createInterface(input);

interface Password {
    letter: string;
    min: number;
    max: number;
    password: string;
};

export async function part1() {
    let validPasswords = 0;

    for await (const line of reader) {
        const match = line.match(format);
        if (match === null) continue;

        const password: Password = {
            letter: match.groups ? match.groups['letter']: '',
            min: match.groups ? Number.parseInt(match.groups['min']): 0,
            max: match.groups ? Number.parseInt(match.groups['max']): 0,
            password: match.groups ? match.groups['password']: '',
        };

        if (isPasswordValid(password)) validPasswords++;
    }

    console.log(validPasswords);
}

function isPasswordValid(password: Password): boolean {
    let occurences = 0;
    for (const c of password.password) {
        if (c === password.letter) {
            occurences++;
        }
    }

    return occurences >= password.min && occurences <= password.max;
}

export async function part2() {
    let validPasswords = 0;

    for await (const line of reader) {
        const match = line.match(format);
        if (match === null) continue;

        const password: Password = {
            letter: match.groups ? match.groups['letter']: '',
            min: match.groups ? Number.parseInt(match.groups['min']): 0,
            max: match.groups ? Number.parseInt(match.groups['max']): 0,
            password: match.groups ? match.groups['password']: '',
        };

        if (isPasswordValid2(password)) validPasswords++;
    }

    console.log(validPasswords);
}

function isPasswordValid2(password: Password): boolean {
    const cond1 = password.password[password.min - 1] === password.letter;
    const cond2 = password.password[password.max - 1] === password.letter;
    
    if (cond1 && cond2) return false;
    if (!cond1 && !cond2) return false;

    return true;
}