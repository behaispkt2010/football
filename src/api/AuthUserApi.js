import axiosClient from "./axiosClient";

const AuthUserApi = {
	login: (params) => {
		const url = "/auth/login";
		return axiosClient.post(url, params).then((response) => {
      		if (response.data.auth_token) {
	        	localStorage.setItem("userData", JSON.stringify(response.data));
	      	}
	      	return response.data;
	    });
	},
	register: (params) => {
		const url = "/auth/register";
		return axiosClient.post(url, params).then((response) => {
      		if (response.data.auth_token) {
	        	localStorage.setItem("userData", JSON.stringify(response.data));
	      	}
	      	return response.data;
	    });
	},
	logout: () => {
		localStorage.removeItem("userData");
		window.location.reload();
	},
	getCurrentUser: () => {
		return JSON.parse(localStorage.getItem("userData"));
	},
	getTokenHearder: () => {
		const user = localStorage.getItem("userData");
		if(user && user.auth_token) {
			return {Authorization: 'Bearer ' + user.auth_token};
		} else {
			return {};
		}
	}
}

export default AuthUserApi;   