FROM node:latest

RUN apt-get update && \
    # apt-get install -y libgtk2.0-0 libgconf-2-4 \
    # libnotify4 libasound2 libxtst6 libxss1 libnss3 xvfb
    apt-get -y install \
    make unzip g++ libssl-dev git xvfb x11-xkb-utils \
    xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic \
    x11-apps clang libdbus-1-dev libgtk2.0-dev libnotify-dev \
    libgnome-keyring-dev libgconf2-dev libasound2-dev \
    libcap-dev libcups2-dev libxtst-dev libxss1 libnss3-dev \
    gcc-multilib g++-multilib

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

EXPOSE 5000
#CMD [ "node", "index.js" ]

ENTRYPOINT DEBUG=nightmare xvfb-run --server-args="-screen 9 1280x2000x24" npm start