export default {

  timeStampToDateString (time) {
    if (time == null) {
      return null
    }
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    return result
  },
  timeStampToDayString (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let result = year + '-' + month + '-' + day
    return result
  },
  timeStampToDateMinute (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    return result
  }
}
