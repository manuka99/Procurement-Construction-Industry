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

export const CreateType = payload => {
  return Api().post(`/auth/types`, payload);
};

export const DeleteType = id => {
  return Api().delete(`/auth/types/${id}`);
};
