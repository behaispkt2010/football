import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const PermissionApi = {
	getAll: (params) => {
		const url = "/permission";
		return axiosClient.get(url, params); 
	},
	get: (id) => {
		const url = `/permission/${id}`; 
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/permission";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/permission/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/permission/delete/${id}`;
		return axiosClient.delete(url);
	}
}

export default PermissionApi;