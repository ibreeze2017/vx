import { guid, pipe } from '../util';
import { copyTreeList, getTreeNodesOfDepth, toTree } from '../data';

test('Generate GUID', () => {
  expect(guid()).toBeTruthy();
});

test('Pipe Test', () => {
  expect(pipe('100')).toBe('100');
  expect(pipe('100', () => 0)).toBe(0);
  expect(pipe('100', (a) => a + 1)).toBe('1001');
});


describe('测试Tree相关', () => {
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
  beforeAll(() => {
    console.log('START TEST TREE....');
  });
  afterAll(() => {
    console.log('STOP TEST TREE....');
  });
  test('测试Tree组装', () => {
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
  test('复制Tree', () => {
    expect(copyTreeList(data)).toEqual(data);
  });
  test('获取指定深度', () => {
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
        children: [],
        data: {
          name: 'Server End',
        },
      },
    ];
    const result = getTreeNodesOfDepth(data, 0, (node) => {
      const newNode = { ...node };
      newNode.children = [];
      return newNode;
    });
    expect(result).toEqual(expected);
    const result2 = getTreeNodesOfDepth(data, 1);
    const expected2 = [
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
    expect(result2).toEqual(expected2);
  });
});
