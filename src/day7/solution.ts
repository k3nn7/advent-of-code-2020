import * as fs from 'fs';
import * as rd from 'readline';

export function parseGraph(input: string): Array<Map<number, number>> {
    const symbolTable = new Map<string, number>();
    const graph = new Array<Map<number, number>>();

    for (const line2 of input.split('\n')) {
        const line = line2.trim();
        
        const match = line.match(/^(?<from>[a-z]+ [a-z]+) bags contain(?<to> .+)\.$/);
        if (!match) continue;

        const from = match?.groups ? match?.groups['from'] : '';
        const nodeId = getId(symbolTable, from);

        const toString = match?.groups ? match?.groups['to'] : '';
        const toMatches = toString.matchAll(/((?<count>\d+) (?<to>[a-z]+ [a-z]+) bags?)/g);
        const adjacentNodes = new Map<number, number>();
        for (const toMatch of toMatches) {
            const toNode = toMatch.groups ? toMatch.groups['to'] : '';
            const toNodeId = getId(symbolTable, toNode);
            const count = toMatch.groups ? Number.parseInt(toMatch.groups['count']) : 0;

            adjacentNodes.set(toNodeId, count);
        }

        graph[nodeId] = adjacentNodes;
    }

    for (let i = 0; i < graph.length; i++) {
        if (!graph[i]) graph[i] = new Map<number, number>();
    }

    console.log('shiny gold', getId(symbolTable, 'shiny gold'));

    return graph;
}

export function pathExists(graph: Array<Map<number, number>>, from: number, to: number): boolean {
    return dfs(graph, from, to, new Set<number>());
}

function dfs(graph: Array<Map<number, number>>, from: number, to: number, visited: Set<number>): boolean {
    if (from === to) return true;

    for (const [neighbour, count] of graph[from]) {
        if (!visited.has(neighbour)) {
            visited.add(neighbour);
            if (dfs(graph, neighbour, to, visited)) return true;
        }
    }

    return false;
}

function dfs2(graph: Array<Map<number, number>>, from: number): number {
    let sum = 1;
    for (const [neighbour, count] of graph[from]) {
        sum += count * dfs2(graph, neighbour);
    }

    return sum;
}

function getId(symbolTable: Map<string, number>, entry: string): number {
    if (symbolTable.has(entry)) {
        return symbolTable.get(entry) ?? 0;
    } else {
        const fromId = symbolTable.size;
        symbolTable.set(entry, fromId);

        return fromId;
    }
}

export async function part1() {
    const input = fs.createReadStream('./src/day7/input');
    const reader = rd.createInterface(input);

    const lines = new Array<string>();
    for await (const line of reader) {
        lines.push(line);
    }

    const graph = parseGraph(lines.join('\n'));

    let sum = 0;
    graph.forEach((value, i) => {
        if (pathExists(graph, i, 10)) sum++;
    });

    console.log(sum);

    console.log(dfs2(graph, 10));
}

export async function part2() {
    
}