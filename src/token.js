const { login } = require("./api");
const { USERS } = require("../config");

/**
 * 获取本轮所需access key和新的refresh key
 * @returns Object
 */
const getToken = async () => {
	const promises = [];
	const access_keys = [];
	const new_refresh_keys = [];

	USERS.forEach((user) => promises.push(login(user)));
	const response = await Promise.all(promises);

	response.forEach((res) => {
		new_refresh_keys.push(res.data.refresh_token);
		access_keys.push(res.data.access_token);
	});

    return {access_keys, new_refresh_keys};
};

module.exports = { getToken };
