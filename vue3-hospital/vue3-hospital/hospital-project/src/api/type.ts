interface Response {
  code : number
  message : string
  // @ts-ignore
  ok : boolean
}
export interface Content {
  id :number
  createTime :string
  updateTime :string
  param: {
    hostypeString :string
    fullAddress :string
  }
  hoscode :string
  hosname :string
  hostype :string
  provinceCode :string
  cityCode :string
  districtCode :string
  address :string
  logoData :string
}
export interface Hospital {
  number :number
  size :number
  empty :boolean
  numberOfElements :number
  totalElements :number
  totalPages :number
  content :Content[]
}
export interface HospitalList extends Response {
  data: Hospital
}
export interface AreaAndLevelOne {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  name: string
  value: string
  dictCode: string
  hasChildren: boolean
}
export interface areaAndLevelRes extends Response{
  data: AreaAndLevelOne []
}