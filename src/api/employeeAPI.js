import axios from 'axios';

export default axios.create({
	baseURL: 'https://codechallenge.rivet.work/api/v1',
	headers: {
		'Content-Type': 'application/json',
		token: process.env.REACT_APP_API_TOKEN
	}
});
