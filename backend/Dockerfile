FROM node:20

ENV NODE_ENV=production
# ineffiction but wrote it fast
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["pnpm", "--filter", "backend", "start"]
