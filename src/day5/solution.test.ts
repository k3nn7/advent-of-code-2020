import { getRowRange, parseInput } from './solution';

test('getRowRange', () => {
    expect(getRowRange('F', 0, 127)).toStrictEqual({min: 0, max: 63});
    expect(getRowRange('B', 0, 127)).toStrictEqual({min: 64, max: 127});

    expect(getRowRange('F', 0, 63)).toStrictEqual({min: 0, max: 31});
    expect(getRowRange('B', 0, 63)).toStrictEqual({min: 32, max: 63});

    expect(getRowRange('F', 64, 127)).toStrictEqual({min: 64, max: 95});
    expect(getRowRange('B', 64, 127)).toStrictEqual({min: 96, max: 127});
});

test('parseInput', () => {
    expect(parseInput('BFFFBBFRRR')).toStrictEqual({row: 70, column: 7, id: 567});
    expect(parseInput('FFFBBBFRRR')).toStrictEqual({row: 14, column: 7, id: 119});
    expect(parseInput('BBFFBBFRLL')).toStrictEqual({row: 102, column: 4, id: 820});
});