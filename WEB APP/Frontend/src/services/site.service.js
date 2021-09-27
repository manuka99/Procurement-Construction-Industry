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

export const DeleteSite = id => {
  return Api().delete(`/auth/sites/${id}`);
};

// ------ Site Item (Budget Item)

export const GetSiteItems = () => {
  return Api().get(`/auth/sites-items`);
};

export const CreateSiteItem = data => {
  return Api().post(`/auth/sites-items`, data);
};

export const DeleteSiteItem = id => {
  return Api().delete(`/auth/sites-items/${id}`);
};

// ------ Site Officer

export const GetSiteOfficers = () => {
  return Api().get(`/auth/sites-officers`);
};

export const CreateSiteOfficer = data => {
  return Api().post(`/auth/sites-officers`, data);
};

export const DeleteSiteOfficer = id => {
  return Api().delete(`/auth/sites-officers/${id}`);
};
