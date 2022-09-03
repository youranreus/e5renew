const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

/**
 * ˯��
 * @param {number} time ˯��ʱ��
 * @returns promise
 */
const sleep = (time) => new Promise((rs) => setTimeout(rs, time));

/**
 * �����
 * @param {number} min ���ֵ
 * @param {number} max ��Сֵ
 * @returns number
 */
const randomNum = (min, max) => min + Math.round(Math.random() * (max - min));

/**
 * ���˯��
 */
const randomSleep = async () => {
	console.log("���˯��");
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
