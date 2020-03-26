export enum PillState {
  default = 0,
  reset = 1
}

export interface ProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
  subProducts: SubProductPill[];
}
export interface SubProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
}

export interface ContractProduct {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
}
export interface Contract {
  id?: string;
  title: string;
  venue: string;
  startDate: Date | string;
  deliveryDate: Date | string;
  details: string;
  attachments?: any[];
  images: ProductImage[];
}
export interface ProductImage {
  id?: number | string;
  name?: string
}
