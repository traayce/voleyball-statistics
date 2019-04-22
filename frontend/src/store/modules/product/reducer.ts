import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_START } from "./constants";
import { ProductReducerState } from "./state";
import { IAction } from "src/store/action";
import { Reducer } from "redux";

const defaultState: ProductReducerState = {
  productsList: [],
  isLoading: false,
  error: false,
  isLoaded: false
};

export const productsReducer: Reducer<ProductReducerState, IAction<ProductReducerState>> = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: undefined,
        isLoaded: true
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        productsList: [],
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

