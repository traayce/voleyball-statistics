import { ProductDTO } from "./dto";
export interface ProductReducerState {
  productsList: Array<ProductDTO>;
  isLoading: boolean;
  isLoaded: boolean;
  error: boolean | undefined;
}
