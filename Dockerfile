FROM node:slim as build

WORKDIR /usr/local/app

COPY ./package.json /usr/local/app/

RUN npm install

COPY . /usr/local/app/

RUN npm run build

EXPOSE 3000

CMD ["yarn","start"]