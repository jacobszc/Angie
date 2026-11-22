##ci is npm install for autmaoted systems
FROM node:22-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5713


CMD npm run dev 

