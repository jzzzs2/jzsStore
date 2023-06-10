interface Res {
  code: number
  ok: boolean
  message: string
}
export type PermissionChild =  Permission []
export interface Permission {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "pid": number,
  "name": string,
  "code": null,
  "type": number,
  "level": number,
  "children": PermissionChild
}
export interface PermissionRes extends Res{
  data: Permission []
}
export interface menuParams {
  id?: number
  code: string
  pid: number
  name: string
  level: number
}