import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_START } from "./constants";
import { productCommands } from "./api";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IState } from "./state";

export const getProducts = (searchText: string) => {
  return async (dispatch: ThunkDispatch<IState, void, Action>) => {
    dispatch(getProductsStart());
    setTimeout(() =>
      productCommands
        .productsApiGet(searchText)
        .then(res => {
          if (res.message !== undefined) {
            return dispatch(getProductsFail("error occured while getting products list"));
          }
          return dispatch(getProductsSuccess(res));
        })
        .catch(err => dispatch(getProductsFail("error occured while gettind products list"))), 1000);
  };
};

const getProductsSuccess = (res: Array<object>) => {
  return ({
    type: GET_PRODUCTS_SUCCESS,
    products: res
  });
};

const getProductsFail = (error: string) => {
  return ({
    type: GET_PRODUCTS_FAILURE,
    error
  });
};

const getProductsStart = () => ({
  type: GET_PRODUCTS_START
});

export const deleteProduct = (id: number) => {
  return async (dispatch: ThunkDispatch<IState, void, Action>) => {
      productCommands.deleteProduct(id);
  };
};