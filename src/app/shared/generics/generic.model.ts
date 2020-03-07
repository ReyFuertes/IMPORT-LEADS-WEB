export enum AddEditState {
  'Add' = 1,
  'Edit' = 2
}
export interface AddEditDialogState {
  formValues: any;
  state: AddEditState
}
export interface SimpleItem {
  label: string;
  value: string;
}
export interface Menu {
  label: string;
  value: string;
  icon?: string;
  action?: () => void;
}

export interface DropdownSelect {
  id: number;
  label: string;
  action?: () => void;
}
