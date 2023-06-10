export const getTime  = () => {
  let clock = new Date().getHours()
  if (clock > 0 && clock < 10) {
    return "早上"
  } else if (clock >= 10 && clock < 13) {
    return "中午"
  } else if (clock >=13 && clock < 18) {
    return "下午"
  } else {
    return "晚上"
  }
}