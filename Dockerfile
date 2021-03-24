FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app
ENV DATABASE=mongodb://mongodb:27017/playground

COPY package*.json ./

RUN npm install glob rimraf
RUN npm install ansi-styles -g

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE=mongodb://mongodb:27017/playground

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
