import { AuthenticationReducerState } from "@reducers/authentication";
import { ProductReducerState } from "@reducers/product/state";
export interface IStore {
  readonly products: ProductReducerState;
  readonly authentication: AuthenticationReducerState;
}
