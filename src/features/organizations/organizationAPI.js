import axios from 'axios';

const url = 'http://localhost:8080';


export const fetchOrganizations = async () => {
  const response = await axios.get(`${url}/organizations`);
  return response.data;
};


export const fetchOrganizationById = async (id) => {
  const response = await axios.get(`${url}/organizations/${id}`);
  return response.data;
};


export const createOrganization = async (organizationData) => {
  const response = await axios.post(`${url}/organizations/create`, organizationData);
  return response.data;
};


export const updateOrganization = async (id, organizationData) => {
  const response = await axios.put(`${url}/organizations/update/${id}`, organizationData);
  return response.data;
};


export const deleteOrganization = async (id) => {
  const response = await axios.delete(`${url}/organizations/delete/${id}`);
  return response.data;
};