/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-21 18:17:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-21 18:20:10
 */
interface Person {
  id: number;
  name: string;
  isSelected: boolean;
}
export function saveInfo (obj : Array<Person>) {
  const objStr = JSON.stringify(obj)
  localStorage.setItem("users_info",objStr)
}
export function getInfo () {
  const objStr = localStorage.getItem("users_info")
  return JSON.parse(<string>objStr)
}