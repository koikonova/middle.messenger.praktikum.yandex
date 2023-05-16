FROM node
WORKDIR /var/www
COPY package.json /app
RUN npm install
COPY . .
RUN npm run buil
EXPOSE 3000
CMD npm run start