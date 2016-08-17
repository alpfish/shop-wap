export default {

// 检查值是否为空
// 值等于 {}, [], null, undefined, 0, '', false 都表示空
// console.log('===> pub.isEmpty({}) : ', pub.isEmpty({}));
// console.log('===> pub.isEmpty([]) : ', pub.isEmpty([]));
// console.log('===> pub.isEmpty("") : ', pub.isEmpty(""));
// console.log('===> pub.isEmpty(0) : ', pub.isEmpty(0));
// console.log('===> pub.isEmpty(null) : ', pub.isEmpty(null));
// console.log('===> pub.isEmpty(undefined) : ', pub.isEmpty(undefined));
// console.log('===> pub.isEmpty(false) : ', pub.isEmpty(false));
// console.log('===> pub.isEmpty(1) : ', pub.isEmpty(1));
// console.log('===> pub.isEmpty("0") : ', pub.isEmpty("0"));
isEmpty: function(value) {
  if (value) {
    if (value === Object(value)) {
      for (let key in value) {
        return false;
      }
      return true;
    }
    return false;
  }
  return true
}

notEmpty: function (value) => !this.isEmpty(value)

} // export END
