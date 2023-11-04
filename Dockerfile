FROM oven/bun:1.0.0
WORKDIR app
COPY package.json ./
RUN bun i
COPY . .
EXPOSE 8000
CMD ["bun", "run", "prod"]