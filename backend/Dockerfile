FROM node:22.22.0-bookworm

WORKDIR /express-react

COPY package.json .

RUN npm install

COPY dist .
COPY .env .

EXPOSE 3000

ENTRYPOINT [ "node", "/express-react/index.js" ]
