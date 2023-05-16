FROM node
WORKDIR /var/www
ADD . /var/www
ADD package.json /var/www/package.json
RUN npm install
COPY . .
RUN npm run buil
EXPOSE 3000
CMD npm run start