# 自用E5保活docker
## 环境变量
- APP_ID
- APP_SECRET
- SERVER_CHAN

## docker执行
```bash
docker container run -it --rm -v $(pwd):/data -e APP_ID=4d7f3662-37c5-4c5c-9d36-6ed9239da4d2 -e APP_SECRET=8su8Q~jVyz1zjrhVEgziVaiSrGsPrnQYSjRLEbYb -e SERVER_CHAN=SCT39498T1WkUAj3lqSz1S8PRvfPsAB9i youranreus/e5renew /bin/sh /work/start.sh
```