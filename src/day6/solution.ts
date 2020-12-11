import * as fs from 'fs';
import * as rd from 'readline';

const input = fs.createReadStream('src/day6/input');
const reader = rd.createInterface(input);

export async function part1() {
    let sum = 0;
    const answers = new Set<String>();

    for await (const line of reader) {
        if (line === '') {
            sum += answers.size;
            answers.clear();
        }

        for (const char of line) {
            answers.add(char);
        }
    }

    sum += answers.size;

    console.log(sum);
}

export async function part2() {
    let sum = 0;
    let peopleInGroup = 0;
    const answers = new Map<string, number>();

    for await (const line of reader) {
        if (line === '') {
            for (const [_, people] of answers) {
                if (people === peopleInGroup) sum++;
            }

            peopleInGroup = 0;
            answers.clear();
        } else {
            peopleInGroup++;
            for (const char of line) {
                answers.set(
                    char,
                    (answers.get(char) ?? 0) + 1,
                );
            }
        }
    }

    for (const [_, people] of answers) {
        if (people === peopleInGroup) sum++;
    }

    console.log(sum);
}