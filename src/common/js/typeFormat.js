// 价格浮动:0-不涨不跌,1--上涨,2-下跌,3-初始导入
const userStatusEnums = [
  {value: '', label: '全部'},
  {value: '0', label: '未认证'},
  {value: '1', label: '正常状态'},
  {value: '2', label: '已删除'}
]

export default {
  getListWithoutAll (enums) {
    let list = []
    enums.forEach(function (item) {
      if (item.value !== '') {
        list.push(item)
      }
    })
    return list
  },
  getListWithoutParam (enums,array) {
    let list = []
    enums.forEach(function (item) {
      if (array.indexOf(item.label) === -1) {
        list.push(item)
      }
    })
    return list
  },
  getLabel (value, enums) {
    let label = ''
    enums.forEach(function (item) {
      if (value === Number(item.value) || value === item.value) {
        label = item.label
      }
    })
    return label
  },
  // 根据value获得对应的type，type是为了调整原因的特殊需求扩展而来
  // type属性不是公共属性，拥有type属性时才能用此方法
  getType (value, enums) {
    let type = ''
    enums.forEach(function (item) {
      if (value === Number(item.value) || value === item.value) {
        type = item.type
      }
    })
    return type
  },

  userStatusEnums
}
