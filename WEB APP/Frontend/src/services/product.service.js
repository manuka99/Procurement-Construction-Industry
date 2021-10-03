import Api from "./api";

export const CreateProduct = payload => {
  return Api().post(`/auth/products`, payload);
};

export const GetAllWithProductsAndSuppliers = () => {
  return Api().get(`/auth/products`);
};

export const DeleteProduct = id => {
  return Api().delete(`/auth/products/${id}`);
};

export const GetProduct = id => {
  return Api().get(`/auth/products/${id}`);
};

export const GetProductsForType = type => {
  return Api().get(`/auth/products?productType=${type}`);
};
