import Api from "./api";

export const GetSiteManagers = () => {
  return Api().get(`/auth/users-sitemanagers`);
};
