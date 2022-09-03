require("dotenv").config();
const USERS = require("./user.json").users;

const { APP_ID, APP_SECRET } = process.env;

module.exports = {
	APP_ID,
	APP_SECRET,
	USERS,
};
