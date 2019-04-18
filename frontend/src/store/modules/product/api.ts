import axios from "axios";
const baseURL: string = "http://localhost:3000/api";
const version: string = "v1.1";
const request = axios.create({
  baseURL,
  headers: {
    Accept: "application/json"
  }
});
export namespace productCommands {
  export const productsApiGet = (searchText: string) => {
    return request
      .get(`/product/${version}`, { params: { name: searchText } })
      .then(res => res.data)
      .catch(err => err);
  };

  export const deleteProduct = (id: number) => {
    return request
      .delete(`/product/${version}/${id}`)
      .then(res => res.data);
  };
}

