export enum PillState {
  default = 0,
  reset = 1
}

export interface IProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
  subProducts: IProductPill[];
}
export interface IProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
}

export interface IContractProduct {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
}
export interface IContract {
  id?: string;
  title: string;
  venue: string;
  startDate: Date | string;
  deliveryDate: Date | string;
  details: string;
  attachments?: any[];
  images: IProductImage[];
}
export interface IProductImage {
  id?: number | string;
  name?: string
}
