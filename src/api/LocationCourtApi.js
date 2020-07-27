import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const LocationCourtApi = {
	getAll: (params) => {
		const url = "/location_court";
		return axiosClient.get(url, params); 
	},
	get: (id) => {
		const url = `/location_court/${id}`; 
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/location_court";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/location_court/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/location_court/delete/${id}`;
		return axiosClient.delete(url);
	}
}

export default LocationCourtApi;