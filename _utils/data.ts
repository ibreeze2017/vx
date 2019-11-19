import {ITreeNode, MapType} from "./interface";

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
  })
}

/**
 * 转换项
 * @param {ITreeNode} item
 * @param {ITreeNode[]} inner
 * @returns {{id: number; pid: number; data: any; children: ITreeNode[]}}
 */
export function transformOutItem(item: ITreeNode, inner: ITreeNode[]) {
  const {id, pid, data} = item;
  return {id, pid, data, children: inner};
}

/**
 * 权限 DFS 遍历
 * @param {ITreeNode} item
 * @param {ITreeNode[]} inner
 * @param {(item: ITreeNode, inner: ITreeNode[]) => ITreeNode} callback
 * @returns {ITreeNode}
 */
export function transformOutData(item: ITreeNode, inner: ITreeNode[], callback?: (item: ITreeNode, inner: ITreeNode[]) => ITreeNode) {
  const {children} = Object.assign({}, item);
  if (children && children.length) {
    inner = children.map(childItem => {
      return transformOutData(childItem, inner, callback);
    });
  }
  if (callback)
    return callback(item, inner);
  return item;
}