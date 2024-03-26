export interface Quotation {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string;
  name?: any;
  ruc?: any;
  dni?: any;
  direction?: any;
  phone?: any;
  dayLimit: number;
  details?: any;
  notes?: any;
  dateLimit: string;
  codeStatus: string;
  products: Product[];
}

interface Product {
  id: number;
  title: string;
  colors: Color2[];
  quantity: number;
  picture_url: string;
  size?: string;
}

interface Color2 {
  id: number;
  color: Color;
  quantity: number;
}

interface Color {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  publishedAt: string;
}
