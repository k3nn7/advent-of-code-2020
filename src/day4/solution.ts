import * as rd from 'readline';
import * as fs from 'fs';
import { PassThrough } from 'stream';

const input = fs.createReadStream('src/day4/input');
const reader = rd.createInterface(input);
const format = /((?<key>[a-z]+):(?<value>[^ ]+))/g;

const byrFormat = /^\d{4}$/;
const iyrFormat = /^\d{4}$/;
const eyrFormat = /^\d{4}$/;
const hgtFormat = /^(?<amount>\d+)(?<unit>cm|in)$/;
const hclFormat = /^\#[0-9a-f]{6}$/;
const eclFormat = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
const pidFormat = /^\d{9}$/;

interface Passport {
    byr: string|null;
    iyr: string|null;
    eyr: string|null;
    hgt: string|null;
    hcl: string|null;
    ecl: string|null;
    pid: string|null;
    cid: string|null;
}

export async function part1() {
    let validPassports = 0;
    let currentPassport: Passport = newPassport();

    for await (const line of reader) {
        if (line === '') {
            if (isValidPassport(currentPassport)) {
                validPassports++;
            }

            currentPassport = newPassport();
            continue;
        }

        const matches = line.matchAll(format);


        for (const match of matches) {
            const key = match.groups ? match.groups['key'] : null;
            const value = match.groups ? match.groups['value']: null;

            switch (key) {
                case 'byr':
                    currentPassport.byr = value;
                    break;
                case 'iyr':
                    currentPassport.iyr = value;
                    break;
                case 'eyr':
                    currentPassport.eyr = value;
                    break;
                case 'hgt':
                    currentPassport.hgt = value;
                    break;
                case 'hcl':
                    currentPassport.hcl = value;
                    break;
                case 'ecl':
                    currentPassport.ecl = value;
                    break;
                case 'pid':
                    currentPassport.pid = value;
                    break;
                case 'cid':
                    currentPassport.cid = value;
                    break;
            }
        }
    }

    if (isValidPassport(currentPassport)) {
        validPassports++;
    }

    console.log(validPassports);
}

export async function part2() {

}

function newPassport(): Passport {
    return {
        byr: null,
        cid: null,
        ecl: null,
        eyr: null,
        hcl: null,
        hgt: null,
        iyr: null,
        pid: null   
    }
}

function isValidPassport1(passport: Passport): boolean {
    return passport.byr !== null &&
    passport.iyr !== null &&
    passport.eyr !== null &&
    passport.hgt !== null &&
    passport.hcl !== null &&
    passport.ecl !== null &&
    passport.pid !== null;
}

function isValidPassport(passport: Passport): boolean {
    const allFields = passport.byr !== null &&
        passport.iyr !== null &&
        passport.eyr !== null &&
        passport.hgt !== null &&
        passport.hcl !== null &&
        passport.ecl !== null &&
        passport.pid !== null;

    if (passport.byr && passport.byr.match(byrFormat)) {
        const byrInt = Number.parseInt(passport.byr);
        if (byrInt < 1920 || byrInt > 2002) return false;
    } else {
        return false;
    }

    if (passport.iyr && passport.iyr.match(iyrFormat)) {
        const iyrInt = Number.parseInt(passport.iyr);
        if (iyrInt < 2010 || iyrInt > 2020) return false;
    } else {
        return false;
    }

    if (passport.eyr && passport.eyr.match(eyrFormat)) {
        const eyrInt = Number.parseInt(passport.eyr);
        if (eyrInt < 2020 || eyrInt > 2030) return false;
    } else {
        return false;
    }

    if (passport.hgt) {
        const match = passport.hgt.match(hgtFormat);
        const amount = Number.parseInt(match?.groups ? match.groups['amount'] : '0');
        const unit = match?.groups ? match.groups['unit'] : '';

        if (unit === 'cm') {
            if (amount < 150 || amount > 193) return false;
        } else if (unit === 'in') {
            if (amount < 59 || amount > 76) return false;
        } else {
            return false;
        }
    } else {
        return false;
    }

    if (!passport.hcl || !passport.hcl.match(hclFormat)) return false;

    if (!passport.ecl || !passport.ecl.match(eclFormat)) return false;

    if (!passport.pid || !passport.pid.match(pidFormat)) return false;

    return true;
}