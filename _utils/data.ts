import { ITreeNode, MapType } from './interface';

/**
 * 获取一个单键值对象
 * @param {string} key
 * @param value
 * @returns {MapType<any>}
 */
export function getPlainObject(key: string, value: any) {
  const o: MapType<any> = {};
  o[key] = value;
  return o;
}

/**
 * 复制TREE
 * @param {ITreeNode[]} sourceTreeList
 * @returns {ITreNode[]}
 */
export function copyTreeList(sourceTreeList: ITreeNode[]) {
  return sourceTreeList.map(item => {
    return transformOutData(item, [], (tItem: ITreeNode, inner: ITreeNode[]) => transformOutItem(tItem, inner));
  });
}

/**
 * 转换项
 * @param {ITreeNode} item
 * @param {ITreeNode[]} inner
 * @returns {{id: number; pid: number; data: any; children: ITreeNode[]}}
 */
export function transformOutItem(item: ITreeNode, inner: ITreeNode[]) {
  const { id, pid, data } = item;
  return { id, pid, data, children: inner };
}

/**
 * 权限 DFS 遍历
 * @param {ITreeNode} item
 * @param {ITreeNode[]} inner
 * @param {(item: ITreeNode, inner: ITreeNode[]) => ITreeNode} callback
 * @returns {ITreeNode}
 */
export function transformOutData(item: ITreeNode, inner: ITreeNode[], callback?: (item: ITreeNode, inner: ITreeNode[]) => ITreeNode) {
  const { children } = Object.assign({}, item);
  if (children && children.length) {
    inner = children.map(childItem => {
      return transformOutData(childItem, inner, callback);
    });
  }
  if (callback)
    return callback(item, inner);
  return item;
}


/**
 * 获取指定深度的树节点列表
 * @param {ITreeNode[]} treeList
 * @param {number} depth
 * @param {(node: ITreeNode) => ITreeNode} callback
 * @returns {ITreeNode[]}
 */
export function getTreeNodesOfDepth(treeList: ITreeNode[], depth: number = 0, callback?: (node: ITreeNode) => ITreeNode) {
  const cb = typeof callback === 'function' ? callback : n => n;
  const result: ITreeNode[] = [];
  loop(treeList);
  return result;

  function loop(paramsTreeList: ITreeNode[], curDepth: number = -1) {
    let nextDepth = ++curDepth;
    paramsTreeList.forEach(node => {
      if (nextDepth === depth) {
        result.push(cb(node));
      }
      if (node.children && node.children.length) {
        loop(node.children, nextDepth);
      }
    });
  }
}


/**
 * 将树转换为List
 * @param {ITreeNode[]} tree
 * @returns {ITreeNode[]}
 */
export function treeToList(tree: ITreeNode[]) {
  const result: ITreeNode[] = [];
  tree.forEach(item => {
    getNode(item);
  });
  return result;

  function getNode(item: ITreeNode) {
    const { children } = item;
    if (children && children.length) {
      item.children.forEach(childItem => {
        getNode(childItem);
      });
    }
    result.push(item);
  }
}

/**
 * 将树转换为Map
 * @param {ITreeNode[]} tree
 * @param {(node: ITreeNode) => ITreeNode} cb
 * @returns {MapType<ITreeNode>}
 */
export function treeToMap(tree: ITreeNode[], cb?: (node: ITreeNode) => ITreeNode) {
  const list = treeToList(tree);
  const result: MapType<ITreeNode> = {};
  list.forEach(item => {
    result[item.id] = typeof cb === 'function' ? cb(item) : item;
  });
  return result;
}

/**
 * 将列表转换为指定键的 Map
 * @param {T[]} list
 * @param {string} key
 * @param {(item: T) => U} cb
 * @returns {MapType<U | T>}
 */
export function listToMap<T = any, U = any>(list: T[], key: string, cb?: (item: T) => U) {
  const result: MapType<U | T> = {};
  list.forEach(item => {
    const itemKey = item[key];
    if (itemKey) {
      result[itemKey] = cb ? cb(item) : item;
    }
  });
  return result;
}

/**
 * 获取指定ID节点
 * @param {ITreeNode[]} treeList
 * @param {number} id
 * @returns {ITreeNode | null}
 */
export function getTreeNode(treeList: ITreeNode[], id: number) {
  let result: ITreeNode | null = null;
  for (const node of treeList) {
    if (node.id === id) {
      result = node;
      break;
    }
    if (node.children) {
      result = getTreeNode(node.children, id);
      if (result) {
        break;
      }
    }
  }
  return result;
}


/**
 * 转换成 tree
 * @param {ITreeNode[]} data
 * @param {string} pidKey
 * @param {string} pk
 * @param {(node: ITreeNode) => ITreeNode} callback
 * @param {number} topValue
 * @returns {ITreeNode[]}
 */
export function toTree(data: ITreeNode[], pidKey = 'pid', pk = 'id', callback?: (node: ITreeNode) => ITreeNode, topValue = -1) {
  const treeList: ITreeNode[] = [];
  const cb = typeof callback === 'function' ? callback : n => n;
  const group: MapType<ITreeNode[]> = {};
  data.forEach(item => {
    item.children = [];
    const pid = item[pidKey];
    if (pid === topValue) {
      treeList.push(cb(item));
    } else {
      if (!group[pid]) {
        group[pid] = [];
      }
      group[pid].push(cb(item));
    }
  });
  return c(treeList, group, pk, cb);

  function c(treeList: ITreeNode[], group: MapType<ITreeNode[]>, pk: string = 'id', cb) {
    for (const node of treeList) {
      const id = node[pk];
      node.children = group[id] || [];
      c(node.children, group, pk, cb);
    }
    return treeList;
  }
}
