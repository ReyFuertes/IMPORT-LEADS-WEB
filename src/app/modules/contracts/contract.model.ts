
export interface ICachedImage {
  id?: string;
  image?: any;
  filename?: string;
  position?: number;
  file?: File;
  size?: any;
  mimetype?: string;
}
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
  contract_name: string;
  venue?: any;
  start_date?: Date | string;
  delivery_date?: Date | string;
  details?: string;
  attachments?: any[];
  images?: IProductImage[];
  created_at?: Date;
  updated_at: Date;
}
export interface IProductImage {
  id?: string;
  filename?: string;
  position?: number
}
