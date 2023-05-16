FROM node
WORKDIR /var/www
COPY package.json ./
CMD npm install && npm run build && npm run start
EXPOSE 3000