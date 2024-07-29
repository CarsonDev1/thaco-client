// @/types/product.ts

export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  imageUrls: string[];
  videoUrl: string | null;
  comments: any[];
  size: string;
  category: Category;
  createdAt: string;
  __v: number;
}
