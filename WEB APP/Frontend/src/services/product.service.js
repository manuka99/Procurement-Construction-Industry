import Api from "./api";

export const CreateProduct = payload => {
  return Api().post(`/auth/products`, payload);
};
