function createMap() {
  const result = {};
  const TypeMap = {
    number: 'Long|Double|Short|Integer|int|long|short|byte|Byte',
    string: 'String|Char',
    boolean: 'Boolean|boolean',
    null: 'Null|null',
  };
  return () => {
    if (Object.keys(result).length) {
      return result;
    }
    Object.keys(TypeMap).forEach(key => {
      TypeMap[key].split('|').map(javaType => {
        result[javaType] = key;
      });
    });
    return result;
  };
}

const mapping = createMap();

function getTsType(javaType) {
  const mappings = mapping();
  return mappings[javaType] ? mappings[javaType] : 'any';
}

function transfer(propertyStr) {
  return propertyStr.split(';').map(item => {
    const [modifier, javaType, property] = item.split(/\s+/).filter(item => !!item);
    return {modifier, javaType, property, tsType: getTsType(javaType)};
  });
}

function createInterface(name, propertyList, exported = true) {
  const tpl = [`interface ${name} {`];
  propertyList.forEach(propertyItem => {
    const {tsType, property} = propertyItem;
    tpl.push('\t' + createSingleType(property, tsType));
  });
  tpl.push('}');
  return (exported ? 'export ' : '') + tpl.join('\r\n');
}

function createSingleType(property, type) {
  return `${property}: ${type};`;
}

export default function transferBeanToTs(propertyStr) {
  const result = transfer(propertyStr);
  const tpl = createInterface('Bean', result);
  console.log(tpl);
}
