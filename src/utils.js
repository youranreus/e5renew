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
 * 随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns number
 */
const randomNum = async (min, max) => min + Math.round(Math.random() * (max - min))

module.exports = {
    SECOND,
    MINUTE,
    HOUR,
    sleep,
    randomNum
}