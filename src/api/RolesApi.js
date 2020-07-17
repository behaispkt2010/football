import axiosClient from "./axiosClient";

const RolesApi = {
	getAll: (params) => {
		const url = "/role";
		return axiosClient.get(url, {params});
	},
	get: (id) => {
		const url = "/role/${id}";
		return axiosClient.get(url);
	},
}

export default RolesApi;