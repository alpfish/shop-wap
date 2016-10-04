const color = {
  brand: '#04BBC2',
  white: '#ffffff',
  black: '#000000',
  semi: '#353535',
  gray: '#888888',
  red: '#ff5252',
  orange: '#E16E16',
  yellow: '#FFBC28',
  green: '#4caf50',
  teal: '#65C0C3',
  blue: '#04BBC2',
  purple: '#C36592',
}

// 按钮样式
color['default'] = color['semi']
color['primary'] = color['green']
color['warning'] = color['red']

/*
* 获取颜色
*
* 带透明度参数返回RBGA颜色，否则返回十六进制颜色，
*
* @param string name 颜色名或颜色
* @param float  alpha 透明度
*/
function getColor(name = '', alpha = '') {
  let hex = name[0] === '#' ? name : (color[name] ? color[name] : '')
  if (alpha === '') {
    return hex
  }
  hex = /,/.test(hex) ? hex : toRGB(hex.replace('#', '')).join(',')
  return `rgba(${hex}, ${alpha})`
}

function toRGB(hex) {
  let num = parseInt(hex, 16)
  return [num >> 16, num >> 8 & 255, num & 255]
}

export { getColor }
