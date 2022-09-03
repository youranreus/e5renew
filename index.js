const { getToken } = require("./src/token");
const fs = require('fs');
const {run} = require("./src/task");
const {sendNotice} = require("./src/notify");

(async () => {
    // 获取本次access key以及新的refresh_key
    const {access_keys, new_refresh_keys} = await getToken();
    
    // 保存新refresh_key
    fs.writeFileSync('./user.json', JSON.stringify({users: new_refresh_keys}), 'utf-8');

    // 开始请求
    const tasks = []
    access_keys.forEach(key => tasks.push(run(key)))

    const res = await Promise.all(tasks);
    
    // 发送日志
    await sendNotice(res);
})();
