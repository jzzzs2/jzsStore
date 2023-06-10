/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:05:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-27 18:22:06
 */
export interface loginData{
  username: string
  password: string
}
// interface User {
//   userId: number
//   avatar: string
//   username: string
//   password: string
//   desc: string
//   roles: string[],
//   buttons: string[],
//   routes: string[],
//   token: string
//   // userId: 1,
//   //         avatar:
//   //             'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//   //         username: 'admin',
//   //         password: '111111',
//   //         desc: '平台管理员',
//   //         roles: ['平台管理员'],
//   //         buttons: ['cuser.detail'],
//   //         routes: ['home'],
//   //         token: 'Admin Token',
// }
interface normalData {
  code: number
  message: string
  ok: boolean
}
export interface succType extends normalData {
  data: string
}
export interface errType extends normalData {
  data: null
}
export interface infoType extends normalData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}
// export interface RequestBack{
//   data: string,
//   // data: {
//   //   message?: string
//   //   token?: string
//   // }
// }
// export interface SuccessLogin{
//   code: number,
//   data: {
//     token: string
//   }
// }
// export interface SuccessInfo {
//   code: number,
//   data: {
//     checkUser: User
//   }
// }
