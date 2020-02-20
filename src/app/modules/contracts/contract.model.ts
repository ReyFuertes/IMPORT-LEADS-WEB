export interface Contract {
  id?: string;
  title: string;
  venue: string;
  startDate: Date | string;
  deliveryDate: Date | string;
  details: string;
  attachments?: any[];
}
