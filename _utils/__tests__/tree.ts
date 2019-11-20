import { guid, pipe } from '../util';
import { toTree } from '../data';

test('Generate GUID', () => {
  expect(guid()).toBeTruthy();
});

test('Pipe Test', () => {
  expect(pipe('100')).toBe('100');
  expect(pipe('100', () => 0)).toBe(0);
  expect(pipe('100', (a) => a + 1)).toBe('1001');
});


test('测试Tree组装', () => {
  const data = [
    {
      id: 1,
      pid: -1,
      children: [],
      data: {
        name: 'Front End',
      },
    },
    {
      id: 2,
      pid: -1,
      children: [],
      data: {
        name: 'Server End',
      },
    },
    {
      id: 3,
      pid: 2,
      children: [],
      data: {
        name: 'PHP',
      },
    },
    {
      id: 4,
      pid: 2,
      children: [],
      data: {
        name: 'Java',
      },
    },
  ];
  const result = toTree(data);
  const expected = [
    {
      id: 1,
      pid: -1,
      children: [],
      data: {
        name: 'Front End',
      },
    },
    {
      id: 2,
      pid: -1,
      children: [
        {
          id: 3,
          pid: 2,
          children: [],
          data: {
            name: 'PHP',
          },
        },
        {
          id: 4,
          pid: 2,
          children: [],
          data: {
            name: 'Java',
          },
        },
      ],
      data: {
        name: 'Server End',
      },
    },
  ];
  expect(result).toEqual(expected);
});