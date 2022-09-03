const { createAPI, apiList } = require("./api");
const { randomSleep } = require("./utils");

/**
 * 获取用户数据
 * @param {Axios API} API API
 * @returns Object
 */
const getUserData = async (API) => (await API.get("/me")).data;

/**
 * 运行任务
 * @param {string} token 用户access token
 * @returns Object
 */
const run = async (token) => {
	const API = createAPI(token);
	const UserData = await getUserData(API);
	console.log(`[e5] 用户${UserData.displayName}开始执行`);
	const report = {
		user: UserData.displayName,
		successNum: 0,
		errorNum: 0,
		totalNum: 0,
		errors: [],
		start: new Date().toString(),
		end: "",
	};

	for (let i = 0; i < apiList.length; i++) {
		await randomSleep();
		try {
			console.log(`[e5] 用户${report.user}尝试请求${apiList[i]}`);
			await API.get(apiList[i]);
			console.log(`[e5] 用户${report.user}请求${apiList[i]}成功`);
			report.successNum++;
		} catch (e) {
			console.log("[e5] " + e.message);
			report.errorNum++;
			report.errors.push([apiList[i], e.message]);
		}
		report.totalNum++;
	}

	report.end = new Date().toString();
	return report;
};

module.exports = {
	run,
};
