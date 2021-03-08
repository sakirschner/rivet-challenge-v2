import { client } from './client';

export const imageAPI = client;

imageAPI.post = function (endpoint, body, customConfig = {}) {
	return imageAPI(endpoint, { ...customConfig, body, method: 'POST' });
};
