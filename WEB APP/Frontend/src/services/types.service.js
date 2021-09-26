import Api from "./api";

export const GetALL = () => {
  return Api().get(`/auth/types`);
};

export const CreateType = payload => {
  return Api().post(`/auth/types`, payload);
};

export const DeleteType = id => {
  return Api().delete(`/auth/types/${id}`);
};
