const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

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

/**
 * 获取时间
 * @returns String
 */
const getDate = () => dayjs().tz("Asia/Shanghai").format('YYYY-M-D H:mm:ss');

/**
 * 获取时间间隔
 * @param {string} start 起始时间
 * @param {string} end 结束时间
 * @returns string
 */
const timeBetween = (start, end) => dayjs(end).from(start, true)

module.exports = {
	SECOND,
	MINUTE,
	HOUR,
	sleep,
	randomNum,
	randomSleep,
	getDate,
	timeBetween
};
