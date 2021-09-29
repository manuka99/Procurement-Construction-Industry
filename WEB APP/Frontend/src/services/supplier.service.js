import Api from "./api";

export const GetALLSuppliers = () => {
  return Api().get(`/auth/suppliers`);
};

export const GetALLSuppliersWithProducts = () => {
  return Api().get(`/auth/suppliers/products`);
};

export const GetSupplier = id => {
  return Api().get(`/auth/suppliers/${id}`);
};

export const DeleteSupplier = id => {
  return Api().delete(`/auth/suppliers/${id}`);
};
