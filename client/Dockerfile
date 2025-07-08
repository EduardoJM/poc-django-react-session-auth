FROM node:22 as builder

WORKDIR /app

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD . .

RUN npm run build:prod

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
