import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_START } from "./constants";
import { IState } from "./state";

const defaultState: IState = {
  products: [],
  isLoading: false,
  error: undefined,
  isLoaded: false
};
interface Type {
  type: string;
}
type Action = IState & Type;

export const productsReducer = (state: IState = defaultState, action: Action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        products: action.products,
        isLoading: false,
        error: undefined,
        isLoaded: true
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        products: [],
        error: action.error,
        isLoaded: true
      };
    case GET_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
        error: undefined,
        isLoaded: false
      };
    default:
      return state;
  }
};

