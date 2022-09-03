FROM node:16-alpine

WORKDIR /work

COPY ./ /work/

RUN npm install --registry=https://registry.npm.taobao.org
RUN mkdir /data

CMD ["sleep", "infinity"]