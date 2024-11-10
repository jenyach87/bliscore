export type IDataType = IData[]

export interface IData {
  name: string
  cityId: string
  children: IChildren[]
}

export interface IChildren {
  name: string
  shopId: string
  children: IChildrenSecond[]
}

export interface IChildrenSecond {
  name: string
  age: number
  salary: number
  managerId: string
}