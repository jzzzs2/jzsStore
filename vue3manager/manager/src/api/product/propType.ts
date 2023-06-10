interface category {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}
export interface responseType {
  code: number
  messsage: string
  ok: boolean
  data: category[]
}
export interface cateStoreType {
  c1Arr: category [],
  c1Id: string | number
  c2Arr: category [],
  c2Id: string | number
  c3Arr: category [],
  c3Id: string | number
}
interface response {
  code: number,
  ok: boolean,
  message: string
}
export interface AttrValue {
  id?: number,
  valueName: string,
  attrId?: number
}
export interface Attr {
  id?: number,
  attrName: string,
  categoryLevel: number,
  categoryId: number,
  attrValueList: AttrValue []
}
export interface responseAttr extends response{
  data: Attr []
}