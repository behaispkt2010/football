import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const RolesApi = {
	getAll: (params) => {
		const url = "/role";
		return axiosClient.get(url, params); 
	},
	get: (id) => {
		const url = `/role/${id}`; 
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/role";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/role/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/role/delete/${id}`;
		return axiosClient.delete(url);
	}
}

export default RolesApi;