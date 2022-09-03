const axios = require("axios");
const { SERVER_CHAN } = require("../config");
const qs = require("qs");

const sendNotice = async (reports) => {
	reports.forEach(async (report) => {
		const title = report.user + "has finised e5 cron job";
		const content = `
        started at ${report.start}
        ended at ${report.end}
        successfully requested ${report.successNum} time(s)
        error occurred ${report.errorNum} time(s)
        ${report.totalNum} apis in total.
        ------
        error list: ${report.errors}
        `;

		try {
			await axios
				.post(
					"https://sctapi.ftqq.com/" + SERVER_CHAN + ".send",
					qs.stringify({
						title,
						desp: content,
					}),
					{
						headers: {
							"Content-type": "application/x-www-form-urlencoded",
						},
					}
				)
				.then((res) => {
					console.log("report sent");
				});
		} catch (error) {
			console.log(error.message);
		}
	});
};

module.exports = {
	sendNotice,
};