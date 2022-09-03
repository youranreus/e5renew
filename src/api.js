const axios = require("axios");
const { APP_ID, APP_SECRET } = require("../config");
const qs = require('qs');

const login = (token) =>
	axios.post(
		"https://login.microsoftonline.com/common/oauth2/v2.0/token",
		qs.stringify({
			grant_type: "refresh_token",
			refresh_token: token,
			client_id: APP_ID,
			client_secret: APP_SECRET,
			redirect_uri: "http://localhost:53682/",
		}),
		{
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			},
		}
	);

module.exports = {
	login,
};
