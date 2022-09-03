const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

/**
 * 睡眠
 * @param {number} time 睡眠时间
 * @returns promise
 */
const sleep = (time) => new Promise((rs) => setTimeout(rs, time));

/**
 * 随机数字
 * @param {number} min 最大值
 * @param {number} max 最小值
 * @returns number
 */
const randomNum = (min, max) => min + Math.round(Math.random() * (max - min));

/**
 * 随机睡眠
 */
const randomSleep = async () => {
	console.log("[e5] random sleep...");
	await sleep(randomNum(1, 60) * SECOND);
};

module.exports = {
	SECOND,
	MINUTE,
	HOUR,
	sleep,
	randomNum,
	randomSleep,
};
