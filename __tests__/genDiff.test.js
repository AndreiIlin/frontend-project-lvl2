import genDiff from '../src/genDiff.js';
import readFile from '../src/readFile.js';

test('diff1', () => {
  const actual = genDiff({ one: 'two' }, { next: 5 });
  const expected = [
    {
      key: 'next',
      value: 5,
      sign: '+',
      depth: 1,
    },
    {
      key: 'one',
      value: 'two',
      sign: '-',
      depth: 1,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff2', () => {
  const actual = genDiff({ one: 'two' }, {});
  const expected = [
    {
      key: 'one',
      value: 'two',
      sign: '-',
      depth: 1,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff3', () => {
  const actual = genDiff({}, { next: 5 });
  const expected = [
    {
      key: 'next',
      value: 5,
      sign: '+',
      depth: 1,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff4', () => {
  const actual = genDiff({ one: 'two' }, { one: 'two' });
  const expected = [
    {
      key: 'one',
      value: 'two',
      sign: '=',
      depth: 1,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff5', () => {
  const actual = genDiff({ one: { two: 'two' } }, { one: { two: 'two' } });
  const expected = [
    {
      key: 'one',
      sign: '=',
      depth: 1,
    },
    {
      key: 'two',
      value: 'two',
      sign: '=',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff6', () => {
  const actual = genDiff({ one: { two: 'two' } }, { one: { three: 'two' } });
  const expected = [
    {
      key: 'one',
      sign: '=',
      depth: 1,
    },
    {
      key: 'three',
      value: 'two',
      sign: '+',
      depth: 2,
    },
    {
      key: 'two',
      value: 'two',
      sign: '-',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff7', () => {
  const actual = genDiff({ one: { three: 'two' } }, { one: { two: 'two' } });
  const expected = [
    {
      key: 'one',
      sign: '=',
      depth: 1,
    },
    {
      key: 'three',
      value: 'two',
      sign: '-',
      depth: 2,
    },
    {
      key: 'two',
      value: 'two',
      sign: '+',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff8', () => {
  const actual = genDiff({ one: { two: 'three' } }, { one: { two: 'two' } });
  const expected = [
    {
      key: 'one',
      sign: '=',
      depth: 1,
    },
    {
      key: 'two',
      value: 'three',
      sign: '-',
      depth: 2,
    },
    {
      key: 'two',
      value: 'two',
      sign: '+',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff9', () => {
  const actual = genDiff({ one: { two: 'two' } }, { one: { two: 'three' } });
  const expected = [
    {
      key: 'one',
      sign: '=',
      depth: 1,
    },
    {
      key: 'two',
      value: 'two',
      sign: '-',
      depth: 2,
    },
    {
      key: 'two',
      value: 'three',
      sign: '+',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff10', () => {
  const actual = genDiff({ one: { two: 'three' } }, {});
  const expected = [
    {
      key: 'one',
      sign: '-',
      depth: 1,
    },
    {
      key: 'two',
      value: 'three',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff11', () => {
  const actual = genDiff({}, { one: { two: 'three' } });
  const expected = [
    {
      key: 'one',
      sign: '+',
      depth: 1,
    },
    {
      key: 'two',
      value: 'three',
      depth: 2,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff12', () => {
  const actual = genDiff({ one: { two: { three: 'three' } } }, readFile('file3.json'));
  const expected = [
    {
      key: 'one',
      sign: '-',
      depth: 1,
    },
    {
      key: 'two',
      depth: 2,
    },
    {
      key: 'three',
      value: 'three',
      depth: 3,
    },
  ];
  expect(actual).toEqual(expected);
});
test('diff13', () => {
  const actual = genDiff(readFile('file3.yml'), { one: { two: { three: 'three' } } });
  const expected = [
    {
      key: 'one',
      sign: '+',
      depth: 1,
    },
    {
      key: 'two',
      depth: 2,
    },
    {
      key: 'three',
      value: 'three',
      depth: 3,
    },
  ];
  expect(actual).toEqual(expected);
});
