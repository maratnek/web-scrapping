FROM node:latest

RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libnotify4 libasound2 libxtst6 libxss1 libnss3 xvfb

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i --save-dev

RUN npm fund
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#EXPOSE 8080
#CMD [ "node", "index.js" ]

ENTRYPOINT xvfb-run --server-args="-screen 9 1280x2000x24" npm start