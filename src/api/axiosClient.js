import axios from 'axios';
import queryString from 'query-string';
import AuthUserApi from "./AuthUserApi";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
 	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: params => queryString.stringify(params),
});
// console.log(process.env.REACT_APP_API_URL);
axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	config.headers = AuthUserApi.getTokenHearder();
	// console.log(config);
	return config;
})
axiosClient.interceptors.response.use((response) => {
	// console.log(response);
	if (response && response.data) {
		return response.data;
	}
	return response;
}, (error) => {
	// Handle errors
	if(error.response.status === 401) {
		localStorage.clear();
		window.location.href = '/login';
	}
	throw error;
});
export default axiosClient;