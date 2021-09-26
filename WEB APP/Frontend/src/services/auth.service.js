import Api from "./api";

export const Login = payload => {
  return Api().post(`/public/login`, payload);
};

export const Register = payload => {
  return Api().post(`/public/register`, payload);
};
