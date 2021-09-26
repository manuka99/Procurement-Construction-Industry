import Api from "./api";

export const GetProductTypes = () => {
  return Api().get(`/product-type`);
};
