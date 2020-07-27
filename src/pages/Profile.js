import React from "react";
import AuthUserApi from "../api/AuthUserApi";

const Profile = () => {
	const currentUser = AuthUserApi.getCurrentUser();
	return (
		<div className="container">
			<header className="jumbotron">
				<h3>
					<strong>{currentUser.name}</strong> Profile
				</h3>
			</header>
			<p>
				<strong>Token:</strong> {currentUser.auth_token.substring(0, 20)} ...{" "}
				{currentUser.auth_token.substr(currentUser.auth_token.length - 20)}
			</p>
			<p>
				<strong>Id:</strong> {currentUser.id}
			</p>
			<p>
				<strong>Phone:</strong> {currentUser.phone}
			</p>
			<p>
				<strong>Email:</strong> {currentUser.email}
			</p>
			<strong>Authorities:</strong>
			<ul>
	        	{currentUser.role && currentUser.role.map((role, index) => <li key={index}>{role}</li>)}
	      	</ul>
			
    	</div>
	);
}

export default Profile;