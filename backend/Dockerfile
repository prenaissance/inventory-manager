FROM node:20

# ineffiction but wrote it fast
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
ENV NODE_ENV=production
EXPOSE 8080
EXPOSE 10000
ENTRYPOINT ["pnpm", "--filter", "backend", "start"]
