export async function client(endpoint, { body, ...customConfig } = {}, apiURL) {
	const config = {
		body: body ? JSON.stringify(body) : undefined,
		...customConfig,
		headers: {
			'Content-Type': 'application/json',
			...customConfig.headers
		}
	};

	let requestURL;
	if (apiURL) {
		requestURL = `${apiURL}/${endpoint}`;
	} else {
		requestURL = `${endpoint}`;
	}

	let data;
	try {
		const response = await window.fetch(requestURL, config);
		data = response.json();
		if (response.ok) {
			return data;
		}
		const error = new Error(`${response.status} ${response.statusText}`);
		console.error(error);
		throw new Error(error);
	} catch (err) {
		return Promise.reject(err);
	}
}