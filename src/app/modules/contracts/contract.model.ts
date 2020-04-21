import { IProduct } from './../products/products.model';
import { IVenue } from './../venues/venues.models';
import { IUser } from './../../models/user.model';

export class IContractResponse {
  id: string;
  contract_name: string;
  start_date: any;
  delivery_date: any;
  details: string;
  company: string;
  responsible_person: string;
  position: string;
  upload_date: any;
  created_at: any;
  updated_at: any;
  venue: IVenue;
  images: any[];
  user: IUser;
  contract_products: any[];
}

export interface IContractProduct {
  id?: string;
  parent?: IProduct
  sub_products?: IProduct[],
  contract?: IContract;
  cp_id?: string;
}
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
  user?: IUser;
  contract_products?: IProduct[]
}
