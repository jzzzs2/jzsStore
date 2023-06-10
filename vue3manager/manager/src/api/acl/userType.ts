export interface userParams {
  id?: number
  name: string
  username: string
  password?: string
}
interface userResponse {
  code: number
  message: string
  ok: boolean
}
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  roleName?: string
}
export interface userListRes extends userResponse {
  data: User[]
  total: number
  size: number
  current: number
  pages: number
}

export type userList =  User []