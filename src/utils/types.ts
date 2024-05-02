export interface FormData {
  name: string;
  groups: Group[];
}

export interface Group {
  name: string;
  checkpoints: Checkpoint[];
}

export interface Checkpoint {
  type: string;
  name: string;
  placeholder?: string;
  values?: string[];
  value?: string; // Added for holding input value
}
