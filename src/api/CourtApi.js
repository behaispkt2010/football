import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const CourtApi = {
	getAll: (params) => {
		const url = "/court";
		return axiosClient.get(url, params); 
	},
	get: (id) => {
		const url = `/court/${id}`; 
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/court";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/court/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/court/delete/${id}`;
		return axiosClient.delete(url);
	}
}

export default CourtApi;