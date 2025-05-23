FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
CMD npm run migrate && npm run start