FROM node:16-alpine AS builder

RUN apk --no-cache add --virtual native-deps g++ gcc python3 make && npm install --quiet node-gyp -g

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn --ignore-scripts
COPY . .
RUN yarn build && rm -rf node_modules && yarn --production

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /usr/src/app /app

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

# CMD ["node", "./build/src/server.js"]
CMD ["yarn", "start"]