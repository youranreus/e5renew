# 自用E5保活docker
## 环境变量
- APP_ID
- APP_SECRET
- SERVER_CHAN

## docker执行
```bash
docker container run -it --rm -v $(pwd):/data -e APP_ID=xxx -e APP_SECRET=xxx -e SERVER_CHAN=xxx youranreus/e5renew /bin/sh /work/start.sh
```