import { getRandColor, getRandHexColor, toHex, toRGB } from '../format/color';

test('测试RGB转换HEX', () => {
  expect(toRGB('#ffffff')).toBe('rgb(255,255,255)');
});

test('测试HEX转换RGB', () => {
  expect(toHex('rgb(255,255,255)')).toBe('#ffffff');
});

test('测试随机颜色产生', () => {
  expect(getRandColor()).toMatch(/rgb\((\d{0,3},?){3}\)/);
  expect(getRandHexColor()).toMatch(/^#[\da-f]{6}$/i);
});