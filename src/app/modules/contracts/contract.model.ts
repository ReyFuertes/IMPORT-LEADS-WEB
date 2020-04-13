import { IUser } from './../../models/user.model';

export interface IProductImage {
  id?: string;
  image?: any;
  filename?: string;
  position?: number;
  file?: File;
  size?: any;
  mimetype?: string;
  contractId?: string;
}
export enum PillState {
  default = 0,
  reset = 1
}
export interface IProduct {
  id?: string | number;
  product_name: string;
  qty: string | number;
  cost: string | number;
  parent?: IProduct;
  sub_products?: IProduct[];
  created_at?: Date;
  updated_at?: Date;
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
  updated_at?: Date;
  user: IUser;
}
