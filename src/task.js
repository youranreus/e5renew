const { createAPI, apiList } = require("./api");
const { randomSleep } = require("./utils");

/**
 * 获取用户信息
 * @param {Axios API} API API
 * @returns Object
 */
const getUserData = async (API) => (await API.get("/me")).data;

const run = async (token) => {
	const API = createAPI(token);
	const UserData = await getUserData(API);
	console.log(`用户${UserData.displayName}开始执行`);
	const report = {
		user: UserData.displayName,
		successNum: 0,
		errorNum: 0,
		totalNum: 0,
		errors: [],
        start: (new Date()).toLocaleDateString(),
        end: ""
	};

	for (let i = 0; i < apiList.length; i++) {
		await randomSleep();
		try {
			await API.get(apiList[i]);
			report.successNum++;
		} catch (e) {
			console.log(e.message);
			report.errorNum++;
			report.errors.push([apiList[i], e.message]);
		}
		report.totalNum++;
	}

    report.end = (new Date()).toLocaleDateString()
	return report;
};

module.exports = {
	run,
};
