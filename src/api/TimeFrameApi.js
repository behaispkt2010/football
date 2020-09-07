import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const TimeFrameApi = {
	getAll: (params) => {
		const url = "/time_frame";
		// console.log(params);
		return axiosClient.get(url, {params});
	},
	get: (id) => {
		const url = `/time_frame/${id}`; 
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/time_frame";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/time_frame/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/time_frame/delete/${id}`;
		return axiosClient.delete(url);
	}
}
export default TimeFrameApi;