const axios = require("axios");
const { APP_ID, APP_SECRET } = require("../config");
const qs = require("qs");

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

const createAPI = (token) =>
	axios.create({
		baseURL: "https://graph.microsoft.com/v1.0",
		headers: {
			Authorization: token,
			"Content-Type": "application/json",
		},
	});

const apiList = [
	"/me/messages",
	"/me/drive/root/children",
	"/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
	"/me/calendars",
	"/me/drive/recent",
	"/me/drive/sharedWithMe",
	"/me/drive/root/search(q='bangumi')?select=name,id,webUrl",
	"/sites/root",
	"/sites/root/sites",
	"/sites/root/drives",
	"/sites/root/columns",
	"/me/onenote/notebooks",
	"/me/onenote/sections",
	"/me/onenote/pages",
	"/me/mailFolders",
	"/me/outlook/masterCategories",
	"/me/mailFolders/inbox/messageRules",
	'/me/messages?$search="hello world"',
];

module.exports = {
	login,
	createAPI,
	apiList
};
