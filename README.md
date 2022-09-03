# 自用E5保活小工具

## 简介

模拟api调用来提升msdn e5开发者订阅几率。

## 食用方法

### 本地运行

需要有node环境（确信

```bash
# 找一个你喜欢的位置
git clone git@github.com:youranreus/e5renew.git

cd e5renew
mv .env.example .env

# 修改.env，不一定要用vim，填入你的应用信息和server酱推送密钥
vim .env

# 创建你的用户数据，格式在下面
vim user.json

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 运行
node index.js
# 或者
npm run test
```

不出意外的话应该跑起来了

### docker执行

随便找个位置，创建一个`user.json`，然后将你的用户数据写在里面。接着跑一下下面的命令

```bash
docker container run -it --rm -v $(pwd):/data -e APP_ID=xxx -e APP_SECRET=xxx -e SERVER_CHAN=xxx youranreus/e5renew /bin/sh /work/start.sh
```

> 指令中的`APP_ID`，`APP_SECRET`和`SERVER_CHAN`请根据实际情况修改。



### 用户数据模板

```json
{
    "users": ["refresh_token1", "refresh_token", "refresh_token3"]
}
```

请将模板中的`refresh_tokenx`改为真实的值。

> 文件中的内容在每次运行后都会更新，不需要担心过期问题。



## 自动执行

配合crontab可以实现自动执行。

### 本地运行

```bash
crontab -e

# 添加一行
10 9 * * * node /path/to/your/e5renew/index.js

# esc :wq保存退出
```

### docker

```bash
crontab -e

# 添加一行
10 9 * * * docker container run -it --rm -v path_to_your_userdata:/data -e APP_ID=xxx -e APP_SECRET=xxx -e SERVER_CHAN=xxx youranreus/e5renew /bin/sh /work/start.sh

# esc :wq保存退出
```



> 不管是本地还是docker都要注意修改路径到你数据实际存放的地方！



## 其他说明

以下是项目所调用到的api列表

```js
const apiList = [
	"/me/messages",
	"/me/drive/root/children",
	"/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location",
	"/me/calendars",
	"/me/drive/recent",
	"/me/drive/sharedWithMe",
	"/me/drive/root/search(q='bangumi')?select=name,id,webUrl",
	"/sites/root",
	"/sites/root/sites",
	"/sites/root/drives",
	"/sites/root/columns",
	"/me/onenote/notebooks",
	"/me/onenote/sections",
	"/me/onenote/pages",
	"/me/mailFolders",
	"/me/outlook/masterCategories",
	"/me/mailFolders/inbox/messageRules",
	'/me/messages?$search="hello world"',
];
```

本项目是我花了一个上午摸出来的，不保证一定能保活，也没有更多的维护动力。因为本质上还是一个自用的小工具，如果是bug或者有什么地方有问题可以提issue，我一般会解答。如果是新功能的话，可能周期就比较久了。不过也欢迎大家提pr～