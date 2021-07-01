FROM node:lts-alpine as builder
WORKDIR /lover
# RUN npm set registry https://registry.npm.taobao.org
# cache step
COPY package.json /lover/package.json
RUN npm install
# build
COPY ./ /lover
RUN npm run build

FROM nginx as production
RUN mkdir /web
COPY --from=builder /lover/dist/ /web
COPY --from=builder /lover/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80