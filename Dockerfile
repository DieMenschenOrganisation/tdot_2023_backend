FROM oven/bun:latest
WORKDIR app
COPY package.json ./
RUN bun i
COPY . .
EXPOSE 8000
CMD ["bun", "run", "prod"]