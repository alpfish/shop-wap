'use strict'
/**
 * 借鉴于
 * https://github.com/jaywcjlove/validator.js
 *
 * 支持规则： required, mobile, email, tel, url, min, max, min_length, max_length, integer
 *
 * 使用例子：
 *
 * import Validator from '../utils/validator'
 *
 * let v = new Validator
 * v.validate({
 *    value: 'XXXXXX'
 *    rules: 'required|min_length(6)|max_length(20)',
 *    errors: '请输入密码。|密码长度最少6位。|密码长度不能超过20位。',
 * })
 * let error = v.error
 * let faild = v.faild
 * let passed = v.passed
 *
 */
const regexs = {
  // 匹配 max_length(12) => ["max_length",12]
  rule: /^(.+?)\((.+)\)$/,
  // 数字
  numericRegex: /^[0-9]+$/,
  /**
   * @descrition:邮箱规则
   * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
   * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
   * 3.@符号是必填项
   * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
   * 5.邮件提供商域可以包含特殊字符-、_、.
   */
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  /**
   * [ip ipv4、ipv6]
   * "192.168.0.0"
   * "192.168.2.3.1.1"
   * "235.168.2.1"
   * "192.168.254.10"
   * "192.168.254.10.1.1"
   */
  ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
  /**
   * @descrition:判断输入的参数是否是个合格的固定电话号码。
   * 待验证的固定电话号码。
   * 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
   **/
  fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
  /**
   *@descrition:手机号码段规则
   * 13段：130、131、132、133、134、135、136、137、138、139
   * 14段：145、147
   * 15段：150、151、152、153、155、156、157、158、159
   * 17段：170、176、177、178
   * 18段：180、181、182、183、184、185、186、187、188、189
   * 国际码 如：中国(+86)
   */
  mobile: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/,
  /**
   * @descrition 匹配 URL
   */
  url: /[a-zA-z]+:\/\/[^\s]/
}

/**
 * [backVal 判断 field 是否为字符串 ]
 * @param  {[type]}              [Object or String]
 * @return {[type]}              [String]
 */
function backVal(field) {
  return (typeof field === 'string') ? field : field.value
}

const _testHook = {
  // 验证合法邮箱
  email: function(field) {
    return regexs.email.test(backVal(field));
  },
  // 验证合法 ip 地址
  ip: function(field) {
    return regexs.ip.test(backVal(field));
  },
  // 验证传真
  fax: function(field) {
    return regexs.fax.test(backVal(field));
  },
  // 验证座机
  tel: function(field) {
    return regexs.fax.test(backVal(field));
  },
  // 验证手机
  mobile: function(field) {
    return regexs.mobile.test(backVal(field));
  },
  // 验证URL
  url: function(field) {
    return regexs.url.test(backVal(field));
  },
  // 是否为必填
  required: function(field) {
    let value = backVal(field);
    return (value !== null && value !== '')
  },
  // 最大长度
  max_length: function(field, length) {
    if (!regexs.numericRegex.test(length)) return false
    return (backVal(field).length <= parseInt(length, 10))
  },
  // 最小长度
  min_length: function(field, length) {
    if (!regexs.numericRegex.test(length)) return false
    return (backVal(field).length >= parseInt(length, 10))
  },
  // 最小数字
  min(field, min) {
    return (backVal(field) >= parseInt(min, 10))
  },
  // 最大数字
  max(field, max) {
    return (backVal(field) <= parseInt(max, 10))
  },
  // 整数
  integer(field) {
    return /^(-?[1-9]\d*|0)$/.test(backVal(field))
  },
}

class Validator {

  constructor() {
    this.passed = true
    this.faild = false
    this.error = ''
  }

  validate(field) {

    let rules = field.rules.split('|'),
      isEmpty = (!field.value || field.value === '' || field.value === undefined)

    for (let i = 0, ruleLength = rules.length; i < ruleLength; i++) {
      let method = rules[i];
      let parts = regexs.rule.exec(method);

      let param = null

      // 解析带参数的验证如 max_length(12)
      if (parts) method = parts[1], param = parts[2]

      if (typeof _testHook[method] === 'function') {
        if (!_testHook[method].apply(this, [field, param])) {
          this.faild = true
        }
      }
      if (regexs[method] && /^regexp\_/.test(method)) {
        if (!regexs[method].test(field.value)) {
          this.faild = true
        }
      }
      if (this.faild) {
        this.error = (function() {
          return field.errors.split('|')[i]
        })()
        break;
      }
    }

    this.passed = !this.faild

    return this
  }
}

export default Validator
