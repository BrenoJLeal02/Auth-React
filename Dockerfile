FROM node:22.4.0-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y ca-certificates && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update
RUN apt-get install ca-certificates
RUN npm install

COPY . .

ENV NODE_ENV=.env.production

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "start"]
