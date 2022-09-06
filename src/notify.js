const axios = require("axios");
const { SERVER_CHAN } = require("../config");
const qs = require("qs");
const {timeBetween} = require("./utils");

const sendNotice = async (reports) => {
	reports.forEach(async (report) => {
		const title = ` ${report.user} 已完成任务`;
		const content = `开始于 ${report.start}\n
结束于 ${report.end}\n
耗时 ${timeBetween(report.start, report.end)}\n
成功请求 ${report.successNum} 次接口\n
发生了 ${report.errorNum} 次错误\n
一共调用了${report.totalNum} 次接口\n
模拟邮件发送 ${report.mail ? '成功' : '失败'}\n
error list: ${report.errors}`;

		try {
			await axios
				.post(
					"https://sctapi.ftqq.com/" + SERVER_CHAN + ".send",
					qs.stringify({
						title,
						desp: content
					}),
					{
						headers: {
							"Content-type": "application/x-www-form-urlencoded",
						},
					}
				)
				.then((res) => {
					console.log("[e5] report sent");
				});
		} catch (error) {
			console.log("[e5] " + error.message);
		}
	});
};

module.exports = {
	sendNotice,
};
