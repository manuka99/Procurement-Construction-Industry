import Api from "./api";

export const GetALLSuppliers = () => {
  return Api().get(`/auth/suppliers`);
};

export const GetType = id => {
  return Api().get(`/auth/types/${id}`);
};

export const CreateType = payload => {
  return Api().post(`/auth/types`, payload);
};

export const DeleteType = id => {
  return Api().delete(`/auth/types/${id}`);
};
