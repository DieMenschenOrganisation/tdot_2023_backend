FROM oven/bun
WORKDIR app
COPY package.json ./
RUN bun i
COPY . .
CMD ["bun", "run", "prod"]