// employeeAPI.js
import axios from 'axios';

const url = 'http://localhost:8080';


export const fetchEmployees = async (organizationId) => {
  const response = await axios.get(`${url}/employees/${organizationId}/employees`);
  return response.data;
};


export const createEmployee = async (organizationId, employeeData) => {
  const response = await axios.post(`${url}/employees/${organizationId}/employees/create`, employeeData);
  return response.data;
};


export const updateEmployee = async (organizationId, employeeId, updatedData) => {
  const response = await axios.put(`${url}/employees/${organizationId}/employees/${employeeId}`, updatedData);
  return response.data;
};


export const deleteEmployee = async (organizationId, employeeId) => {
  const response = await axios.delete(`${url}/employees/${organizationId}/employees/${employeeId}`);
  return response.data;
};

