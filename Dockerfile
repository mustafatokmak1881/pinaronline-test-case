FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm run migrate
CMD ["npm", "run", "start"]