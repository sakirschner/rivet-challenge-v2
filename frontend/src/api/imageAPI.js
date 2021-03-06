export async function imageAPI(endpoint, { body, ...customConfig } = {}) {
	const config = {
		body: body ? JSON.stringify({data: body}) : undefined,
		headers: {
			'Content-Type': 'application/json',
		},
		...customConfig
	};

	let data;
	try {
        const response = await window.fetch(`${endpoint}`, config)

        data = response.json();
		if (response.ok) {
			return data;
        }
		const error = new Error(`${response.status} ${response.statusText}`)
		console.error(error);
		throw new Error(error);
	} catch (err) {
		return Promise.reject(err);
	}
}

imageAPI.post = function (endpoint, body, customConfig = {}) {
	return imageAPI(endpoint, { ...customConfig, body, method: 'POST' });
};