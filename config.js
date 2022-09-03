require("dotenv").config();
const USERS = require("./user.json").users;

const { APP_ID, APP_SECRET, SERVER_CHAN } = process.env;

module.exports = {
	APP_ID,
	APP_SECRET,
	SERVER_CHAN,
	USERS,
};
