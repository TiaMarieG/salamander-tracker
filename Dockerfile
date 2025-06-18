FROM node:24

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm i

CMD [ "npm", "start" ]