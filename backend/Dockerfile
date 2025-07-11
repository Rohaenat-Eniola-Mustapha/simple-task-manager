FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "index.js"]