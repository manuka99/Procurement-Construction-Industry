import Api from "./api";

export const GetAllSites = () => {
  return Api().get(`/auth/sites`);
};

export const GetSite = id => {
  return Api().get(`/auth/sites/${id}`);
};

export const CreateSite = data => {
  return Api().post(`/auth/sites`, data);
};

export const UpdateSite = (id, data) => {
  return Api().put(`/auth/sites/${id}`, data);
};

export const DeleteSite = id => {
  return Api().delete(`/auth/sites/${id}`);
};

// ------ Site Item (Budget Item)

export const GetSiteItems = id => {
  return Api().get(`/auth/sites-items/${id}`);
};

export const CreateSiteItem = data => {
  return Api().post(`/auth/sites-items`, data);
};

export const UpdateSiteItem = data => {
  return Api().put(`/auth/sites-items/`, data);
};

// ------ Site Officer

export const GetSiteOfficers = id => {
  return Api().get(`/auth/sites-officers/${id}`);
};

export const CreateSiteOfficer = data => {
  return Api().post(`/auth/sites-officers`, data);
};

export const UpdateSiteOfficer = data => {
  return Api().put(`/auth/sites-officers/`, data);
};
