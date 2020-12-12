import { parseGraph, pathExists } from "./solution";

test('create graph from input', () => {
    const input = `
        faded yellow bags contain 4 mirrored fuchsia bags, 4 dotted indigo bags, 3 faded orange bags, 5 dark crimson bags.
        striped olive bags contain 4 dark crimson bags.
    `;

    const expectedGraph = [
        new Map<number, number>([[1, 4], [2, 4], [3, 3], [4, 5]]),
        new Map(),
        new Map(),
        new Map(),
        new Map(),
        new Map([[4, 4]]),
    ];

    expect(parseGraph(input)).toStrictEqual(expectedGraph);
});

test('pathExists', () => {
    const graph = [
        new Map<number, number>([[1, 4], [2, 4], [3, 3], [4, 5]]),
        new Map(),
        new Map([[0, 1]]),
        new Map(),
        new Map(),
        new Map([[4, 4]]),
    ];

    expect(pathExists(graph, 0, 4)).toBeTruthy();
});