const { createAPI, apiList } = require("./api");
const { randomSleep } = require("./utils");

/**
 * ��ȡ�û�����
 * @param {Axios API} API API
 * @returns Object
 */
const getUserData = async (API) => (await API.get("/me")).data;

/**
 * ��������
 * @param {string} token �û�access token
 * @returns Object
 */
const run = async (token) => {
	const API = createAPI(token);
	const UserData = await getUserData(API);
	console.log(`[e5] �û�${UserData.displayName}��ʼִ��`);
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
			console.log(`[e5] �û�${report.user}��������${apiList[i]}`);
			await API.get(apiList[i]);
			console.log(`[e5] �û�${report.user}����${apiList[i]}�ɹ�`);
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
