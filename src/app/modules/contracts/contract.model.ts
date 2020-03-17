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
