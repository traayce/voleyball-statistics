import { ProductDTO } from "./dto";
export interface IState {
  products: Array<ProductDTO>;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | undefined;
}
