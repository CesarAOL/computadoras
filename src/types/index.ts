export interface Computer {
  id: string;
  name: string;
  brand: string;
  model: string;
  serialNumber: string;
  operatingSystem: string;
  processor: string;
  ram: string;
  storage: string;
  graphics: string;
  purchaseDate: string;
  location: string;
  status: 'Active' | 'Maintenance' | 'Retired';
  createdAt: string;
}

export interface ChangeRecord {
  id: string;
  computerId: string;
  type: 'Hardware' | 'Software' | 'Maintenance' | 'Operating System';
  description: string;
  component: string;
  previousValue: string;
  newValue: string;
  date: string;
  notes: string;
  createdAt: string;
}

export interface ComputerFormData {
  name: string;
  brand: string;
  model: string;
  serialNumber: string;
  operatingSystem: string;
  processor: string;
  ram: string;
  storage: string;
  graphics: string;
  purchaseDate: string;
  location: string;
  status: 'Active' | 'Maintenance' | 'Retired';
}

export interface ChangeFormData {
  type: 'Hardware' | 'Software' | 'Maintenance' | 'Operating System';
  description: string;
  component: string;
  previousValue: string;
  newValue: string;
  date: string;
  notes: string;
}