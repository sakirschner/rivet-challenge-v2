import { client } from './client';

const apiURL = process.env.REACT_APP_API_URL;
const apiToken = process.env.REACT_APP_API_TOKEN;

const headers = {token: apiToken}

export const employeeAPI = client;

employeeAPI.get = function (endpoint, customConfig = {}) {
	return employeeAPI(endpoint, { ...customConfig, headers, method: 'GET' }, apiURL);
};

employeeAPI.put = function (endpoint, body, customConfig = {}) {
	return employeeAPI(endpoint, { ...customConfig, headers, body, method: 'PUT' }, apiURL);
};

employeeAPI.post = function (endpoint, body, customConfig = {}) {
	return employeeAPI(endpoint, { ...customConfig, headers, body, method: 'POST' }, apiURL);
};
