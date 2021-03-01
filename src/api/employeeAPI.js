const apiURL = process.env.REACT_APP_API_URL;
const apiToken = process.env.REACT_APP_API_TOKEN;

export async function employeeAPI(endpoint, { body, ...customConfig } = {}) {
	const config = {
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			'Content-Type': 'application/json',
			token: apiToken
		},
		...customConfig
	};

	let data;
	try {
		const response = await window.fetch(`${apiURL}/${endpoint}`, config);
		data = response.json();
		if (response.ok) {
			return data;
		}
		console.error(new Error(`${response.status} ${response.statusText}`));
		throw new Error(response.statusText);
	} catch (err) {
		return Promise.reject(err.message ? err.message : data);
	}
}

employeeAPI.get = function (endpoint, customConfig = {}) {
	return employeeAPI(endpoint, { ...customConfig, method: 'GET' });
};

employeeAPI.put = function (endpoint, body , customConfig = {}) {
	return employeeAPI(endpoint, {...customConfig, body, method: 'PUT'})
};

employeeAPI.post = function (endpoint, body , customConfig = {}) {
	return employeeAPI(endpoint, {...customConfig, body, method: 'PUT'})
};