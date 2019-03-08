FROM node:8

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

#RUN npm install --quiet

COPY . .

#client
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
RUN rm -rf ./node_modules

EXPOSE 8080

WORKDIR /usr/src/app
CMD npm start

