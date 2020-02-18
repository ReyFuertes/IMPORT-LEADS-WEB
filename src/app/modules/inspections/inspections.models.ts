import { SimpleItem } from './../../shared/generics/generic.model';
export interface InspectionPanelModel {
  id: string;
  title: string;
  assignedTo?: string;
  dateRun?: string;
  products?: SimpleItem[]
}
