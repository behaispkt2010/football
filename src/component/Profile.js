import React from "react";
import AuthUserApi from "../api/AuthUserApi";

const Profile = () => {
	const currentUser = AuthUserApi.getCurrentUser();
	return (
		<div className="container">
			<header className="jumbotron">
				<h3>
					<strong>{currentUser.username}</strong> Profile
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
				<strong>Email:</strong> {currentUser.email}
			</p>
			<strong>Authorities:</strong>
			
    	</div>
	);
}

export default Profile;