import { BlogDataArrayType } from "./BlogData";
import { CategoriesType } from "./CategoriesInterface";

export interface OutletContextInterface {
  [x: string]: any;
  blogData?: BlogDataArrayType;
  categoryData?: CategoriesType;
}
export type OutletContextArrayType = OutletContextInterface[];
