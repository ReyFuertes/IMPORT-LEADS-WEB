export interface IVenue {
  id?: string | number;
  name: string;
  location?: string;
  relatedProducts?: IRelatedProduct[];
  contracts?: number;
  inspections?: number;
  avgPassFail?: number;
  rating?: number;
}

export interface IRelatedProduct {
  id: number;
  product: {label: string, value?: string | number};
  averagePrice: number;
  avgPassFail: number;
  quantity: number;
}

export interface IVenuesAddress {
  id: number;
  name: string;
  location: string;
  contactPerson: string;
  phone: string;
}
