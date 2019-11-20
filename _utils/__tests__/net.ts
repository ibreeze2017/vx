import { getIPAddress, hexIp } from '../format/ip';


test('测试IP转换为十六进制', function() {
  expect(hexIp('192.168.31.217')).toBe('0xd91fa8c0');
  expect(hexIp('192.168.8.217')).toBe('0xd908a8c0');
});

test('测试IP转换为字符串', function() {
  expect(getIPAddress('0xd91fa8c0')).toBe('192.168.31.217');
});
