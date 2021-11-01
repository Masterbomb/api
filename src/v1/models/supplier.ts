export interface BaseSupplier {
  name: string;
  website: string;
}

export interface Supplier extends BaseSupplier {
  id: number;
}