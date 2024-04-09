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

export interface Product {
  id: number;
  title: string;
  colors: Color2[];
  quantity: number;
  discout: number;
  picture_url: string;
  size?: string;
  slug: string;
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
