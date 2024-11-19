FROM node:22

WORKDIR /app
COPY . .

RUN npm install && npm run build && npm run svg:build-sprite

ENTRYPOINT ["npm", "start"]
