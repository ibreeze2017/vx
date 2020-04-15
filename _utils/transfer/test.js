function transformOutData(item, inner, callback, key) {
  const { children } = Object.assign({}, item);
  if (children && children.length) {
    inner = children.map(childItem => {
      return transformOutData(childItem, inner, callback, key);
    }).filter(item => (item.children && item.children.length) || item.text.indexOf(key) > -1);
  }
  if (callback)
    return callback(item, inner);
  return item;
}

function transferField(res, key) {
  const result = [];
  res.forEach((item) => {
    result.push(transformOutData(item, [], (item, inner) => {
      const { id, text, children } = item;
      return { id, text, children: inner };
    }, key));
  });
  return result.filter(item => (item.children && item.children.length) || item.text.indexOf(key) > -1);
}

const tree = [
  {
    id: 1,
    text: 'A1',
    children: [
      {
        id: 2,
        text: 'A1-1',
        children: [
          {
            id: 4,
            text: 'A1-1-1',
            children: [],
          },
          {
            id: 5,
            text: 'A1-1-2',
            children: [],
          },
          {
            id: 6,
            text: 'A1-1-3',
            children: [
              {
                id: 7,
                text: 'A1-1-3-1',
                children: [],
              },
              {
                id: 8,
                text: 'A1-1-3-2',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        text: 'A1-2',
        children: [],
      },
    ],
  },
  {
    id: 1,
    text: 'A2',
    children: [],
  },
];

const res = r(tree, f('A1-2'));
console.log(JSON.stringify(res));
require('fs').writeFileSync('./a.json', JSON.stringify(res));

/**
 *
 * @param key 搜索关键字
 * @param filter 搜索过滤实现
 * @param res 待搜索树列表
 * @returns {function(*): (*|boolean)}
 */
function f(key) {
  return (item) => (item.children && item.children.length) || item.text.indexOf(key) > -1;
}

function r(res, filter) {
  const result = [];
  res.forEach((item) => {
    result.push(t(item, [], filter));
  });
  return result.filter(filter);
}

function t(item, inner, filter) {
  const { children } = Object.assign({}, item);
  if (children && children.length) {
    inner = children.map(item => {
      return t(item, inner, filter);
    }).filter(filter);
  }
  // TODO
  const { children: ic, ...rest } = item;
  return { ...rest, children: inner };
}


