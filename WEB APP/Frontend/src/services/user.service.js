import Api from "./api";

export const GetSiteManagers = () => {
  return Api().get(`/auth/users-sitemanagers`);
};

export const GetAllManagementUsers = () => {
  return Api().get(`/auth/users-management`);
};

export const CreateManagementUsers = data => {
  return Api().post(`/auth/users-management`, data);
};

export const UpdateManagementUsers = (id, data) => {
  return Api().put(`/auth/users-management/${id}`, data);
};

export const DeleteManagementUsers = id => {
  return Api().delete(`/auth/users-management/${id}`);
};
