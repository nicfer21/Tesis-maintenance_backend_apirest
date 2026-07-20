# Build stage
FROM node:24-bookworm AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Production stage
FROM node:24-bookworm

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma.config.ts ./
COPY prisma ./prisma

RUN mkdir -p /app/uploads/image /app/uploads/file && \
    chmod -R 777 /app/uploads

ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
