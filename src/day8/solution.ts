import * as rd from 'readline';
import * as fs from 'fs';

enum Operation {
    Nop,
    Acc,
    Jmp
}

interface Instruction {
    op: Operation;
    arg: number;
}

const input = fs.createReadStream('./src/day8/input');
const reader = rd.createInterface(input);

export async function part1() {
    const instructions = new Array<string>();
    for await (const line of reader) {
        instructions.push(line);
    }

    let ip = 0;
    let acc = 0;
    let visitedInstructions = new Set<number>();

    while (!visitedInstructions.has(ip)) {
        visitedInstructions.add(ip);
        const instruction = parseInstruction(instructions[ip]);

        switch (instruction.op) {
            case Operation.Acc:
                acc += instruction.arg;
                ip++;
                break;
            case Operation.Nop:
                ip++;
                break;
            case Operation.Jmp:
                ip += instruction.arg;
                break;
        }
    }

    console.log(acc);
}

export async function part2() {
    const instructions = new Array<Instruction>();
    for await (const line of reader) {
        instructions.push(parseInstruction(line));
    }

    for (let i = 0; i < instructions.length; i++) {
        instructions[i].op = switchOp(instructions[i].op);
        if (i > 0) instructions[i - 1].op = switchOp(instructions[i - 1].op);
        if (!hasLoop(instructions)) {
            console.log(i);
            return;
        }
    }
}

function switchOp(op: Operation): Operation {
    if (op === Operation.Jmp) return Operation.Nop;
    if (op === Operation.Nop) return Operation.Jmp;
    return op;
}

function hasLoop(instructions: Array<Instruction>): boolean {
    let ip = 0;
    let acc = 0;
    let visitedInstructions = new Set<number>();

    while (ip < instructions.length && !visitedInstructions.has(ip)) {
        visitedInstructions.add(ip);
        const instruction = instructions[ip];

        switch (instruction.op) {
            case Operation.Acc:
                acc += instruction.arg;
                ip++;
                break;
            case Operation.Nop:
                ip++;
                break;
            case Operation.Jmp:
                ip += instruction.arg;
                break;
        }
    }

    console.log(acc);
    return ip < instructions.length;
}

function parseInstruction(instruction: string): Instruction {
    const match = instruction.match(/(?<op>[a-z]{3}) (?<arg>(?:-|\+)\d+)/);
    
    const op = parseOperation(match?.groups ? match.groups['op'] : '');
    const arg = parseInt(match?.groups ? match.groups['arg'] : '');

    return {op, arg};
}

function parseOperation(operation: string): Operation {
    switch (operation) {
        case 'nop':
            return Operation.Nop;
        case 'acc':
            return Operation.Acc;
        case 'jmp':
            return Operation.Jmp;
    }

    return Operation.Nop;
}