/**
 * 将字符串IP转成16进制形式
 * @param  {[string]} ipStr [ip字符串]
 * @return {[string]}       [十六进制ip值]
 */
export function hexIp(ipStr: string) {
  let result = "", temp = '';
  const ips = ipStr.split(".");
  for (let i = ips.length - 1; i >= 0; i--) {
    temp = parseInt(ips[i], 10).toString(16);
    if (temp.length < 2)
      temp = "0" + temp;
    result += temp;
  }
  return "0x" + result;
}

/**
 * 将16进制ip转为字符形式
 * @param  {[string]} ip16 [十六进制ip]
 * @return {[string]}      [ip字符串]
 */
export function getIPAddress(ip16: string) {
  let temp: any = 0, ips = [];
  for (let i = ip16.length - 1; i >= 2; i = i - 2) {
    temp = ip16[i - 1] + "" + ip16[i];
    temp = parseInt(temp, 16);
    ips.push(temp)
  }
  return ips.join(".");
}
