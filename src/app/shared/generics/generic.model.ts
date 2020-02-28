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
