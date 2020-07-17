import React, {useState, useEffect} from "react";
import RolesApi from "./api/RolesApi";

function Role() {
	const [rolesList, setRolesList] = useState([]);
	useEffect(() => {
		const fetchRolesList = async() => {
			try {
				const param = {
					_page: 1,
				};
				const response = await RolesApi.getAll(param);
			} catch (error) {
				console.log("Fail to fetch data: ", error);
			}
		}
		fetchRolesList();
	}, []);
}