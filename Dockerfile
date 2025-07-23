# Etapa de build
FROM node:18-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY core ./core
COPY types ./types

RUN npm install --legacy-peer-deps

WORKDIR /app/core
RUN npm run build

# Etapa de runtime
FROM node:18-bullseye

WORKDIR /app

COPY --from=builder /app/core/.next ./.next
COPY --from=builder /app/core/public ./public
COPY --from=builder /app/core/package.json ./package.json
COPY --from=builder /app/core/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/core/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
