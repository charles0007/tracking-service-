FROM node:alpine

WORKDIR /app


COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait


EXPOSE 3200

CMD /wait && npm start