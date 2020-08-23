import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const PickCourtApi = {
	getAll: (params) => {
		const url = "/pick_court";
		return axiosClient.get(url, params); 
	},
	get: (id) => {
		const url = `/pick_court/${id}`; 
		return axiosClient.get(url);
	},
	getAllPicked: (params) => {
		const url = "/pick_court/get-picked"; 
		return axiosClient.post(url, params);
	},
	add: (params) => {
		const url = "/pick_court";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/pick_court/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/pick_court/delete/${id}`;
		return axiosClient.delete(url);
	}
}

export default PickCourtApi;