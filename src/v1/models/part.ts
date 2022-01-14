export interface BasePart {
  name: string;
  manufacturerId: number;
  supplierId: number;
  unitPrice: number;
  description: string;
}

export interface Part extends BasePart {
  id: number;
}