FROM node:lts-slim

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

EXPOSE 3000

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]