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

export const UpdateSiteItem = (id, data) => {
  return Api().put(`/auth/sites-items/${id}`, data);
};

// ------ Site Officer

export const GetSiteOfficers = id => {
  return Api().get(`/auth/sites-officers/${id}`);
};

export const CreateSiteOfficer = data => {
  return Api().post(`/auth/sites-officers`, data);
};

export const UpdateSiteOfficer = (id, data) => {
  return Api().put(`/auth/sites-officers/${id}`, data);
};

// ------ Site orders

export const GetSiteOrders = id => {
  return Api().get(`/auth/sites/site-orders/${id}`);
};

export const GetSiteOrder = id => {
  return Api().get(`/auth/site-orders/${id}`);
};

export const DeleteSiteOrder = id => {
  return Api().delete(`/auth/site-orders/${id}`);
};

export const CreateSiteOrder = data => {
  return Api().post(`/auth/site-orders`, data);
};

export const UpdateSiteOrder = (id, data) => {
  return Api().put(`/auth/site-orders/${id}`, data);
};

// ------ Site orders items

export const GetSiteOrderItems = id => {
  return Api().get(`/auth/site-order-items/${id}`);
};

export const CreateSiteOrderItem = data => {
  return Api().post(`/auth/site-order-items`, data);
};

export const DeleteSiteOrderItem = id => {
  return Api().delete(`/auth/site-order-items/${id}`);
};

export const UpdateSiteOrderItem = (id, data) => {
  return Api().put(`/auth/site-order-items/${id}`, data);
};

// ------ Supplier orders

export const GetAllSupplierOrdersBySiteOrderItem = id => {
  return Api().get(`/auth/site-order-item-supplier-orders/:id${id}`);
};

export const GetAllSupplierOrders = () => {
  return Api().get(`/auth/supplier-orders`);
};

export const CreateSupplierOrder = data => {
  return Api().post(`/auth/supplier-orders`, data);
};

export const DeleteSupplierOrder = id => {
  return Api().delete(`/auth/supplier-orders/${id}`);
};

export const UpdateSupplierOrder = (id, data) => {
  return Api().put(`/auth/supplier-orders/${id}`, data);
};

export const CreateSupplierOrderEvidences = (id, data) => {
  return Api().post(`/auth/supplier-orders-evidences/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
