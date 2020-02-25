export interface VenuesProduct {
  id: number;
  name: string;
  location: string;
  relatedProducts?: RelatedProduct[];
  contracts: number;
  inspections: number;
  avgPassFail: number;
  rating: number;
}

export interface RelatedProduct {
  id: number;
  product: {label: string, value?: string | number};
  averagePrice: number;
  avgPassFail: number;
  quantity: number;
}

export interface VenuesAddress {
  id: number;
  name: string;
  location: string;
  contactPerson: string;
  phone: string;
}
