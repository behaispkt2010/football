import axiosClient from "./axiosClient";
import AuthUserApi from "./AuthUserApi";

const CompanyApi = {
	getAll: (params) => {
		const url = "/company";
		return axiosClient.get(url, params); 
	},
	get: (id) => {
		const url = `/company/${id}`; 
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/company";
		return axiosClient.post(url, params);
	}, 
	update: (params) => {
		const url = `/company/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `/company/delete/${id}`;
		return axiosClient.delete(url);
	}
}

export default CompanyApi;