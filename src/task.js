const { createAPI, apiList, createMail, sendMail } = require("./api");
const { randomSleep } = require("./utils");
const dayjs = require('dayjs');

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
	console.log(`[e5] user ${UserData.displayName} start job`);
	const report = {
		user: UserData.displayName,
		successNum: 0,
		errorNum: 0,
		totalNum: 0,
		errors: [],
		start: dayjs().format('YYYY-M-D H:m:s'),
		mail: false,
		end: "",
	};

	for (let i = 0; i < apiList.length; i++) {
		await randomSleep();
		try {
			console.log(`[e5] user ${report.user} requesting ${apiList[i]}`);
			await API.get(apiList[i]);
			console.log(
				`[e5] user ${report.user} requested ${apiList[i]} successfully`
			);
			report.successNum++;
		} catch (e) {
			console.log("[e5] " + e.message);
			report.errorNum++;
			report.errors.push([apiList[i], e.message]);
		}
		report.totalNum++;
	}

	console.log(`[e5] ${report.user} creating mail draft`);

	try {
		const draft = await createMail(API, {
			subject: "Guten tag!",
			importance: "Low",
			body: {
				contentType: "HTML",
				content: `Today is <b>${(new Date()).toLocaleDateString()}</b>, hava a nice day!`,
			},
			toRecipients: [
				{
					emailAddress: {
						address: UserData.mail,
					},
				},
			],
		})

		if(draft.status !== 201) 
			throw new Error("failed to create draft.");
		
		console.log(`[e5] ${report.user} sending mail draft`);

		const mail = await sendMail(API, draft.data.id);
		if (mail.status !== 202)
			throw new Error(`${report.user} failed to send mail`);
		console.log(`[e5] ${report.user} successfully sent mail`);
		report.mail = true;
	} catch (error) {
		console.log("[e5] " + error.message);
	}

	report.end = dayjs().format('YYYY-M-D H:m:s');
	return report;
};

module.exports = {
	run,
};
