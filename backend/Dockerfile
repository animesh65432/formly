FROM node:20-alpine AS builder 

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY tsconfig.json ./

COPY src ./src 


RUN npx prisma generate --schema=./src/db/prisma/schema.prisma

RUN npx tsc

FROM node:20-alpine 


WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]