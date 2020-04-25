export interface IProduct {
  id?: string;
  product_name: string | any;
  qty: string | number;
  cost: string | number;
  sub_products?: IProduct[];
  parent?: IProduct;
  created_at?: Date;
  updated_at?: Date;
}
