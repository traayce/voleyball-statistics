import { IState as productState } from "./modules/product";
export interface IStore {
  readonly products:  productState;
}
