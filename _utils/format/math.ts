/**
 * 将弧度转为角度
 * @param  {[Number]} arc [弧度]
 * @return {[Number]}     [角度值]
 */
export function toAngle(arc) {
  return arc / Math.PI * 180;
}

/**
 * 将角度转为弧度
 * @param  {[Number]} angle [角度]
 * @return {[Number]}       [弧度值]
 */
export function toArc(angle) {
  return angle / 180 * Math.PI;
}