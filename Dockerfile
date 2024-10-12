FROM node:12.22.12

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild node-sass

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
