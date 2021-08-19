FROM node:12.16.1

RUN apt-get update

# Installing the packages needed to run Nightmare
RUN apt-get install -y \
  xvfb \
  x11-xkb-utils \
  xfonts-100dpi \
  xfonts-75dpi \
  xfonts-scalable \
  xfonts-cyrillic \
  x11-apps \
  clang \
  libdbus-1-dev \
  libgtk2.0-dev \
  libnotify-dev \
  libgnome-keyring-dev \
  libgconf2-dev \
  libasound2-dev \
  libcap-dev \
  libcups2-dev \
  libxtst-dev \
  libxss1 \
  libnss3-dev \
  gcc-multilib \
  g++-multilib \
  libgtk-3.dev

RUN apt-get -y install libxss1 libgconf2-4

# ENV DEBUG="nightmare"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json .
COPY . .

RUN npm install
RUN npm install nightmare

RUN npm audit fix --force
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY deploy .

# ENTRYPOINT DEBUG=nightmare:*,electron:* xvfb-run --server-args="-screen 0 1280x2000x24" npm start
ENTRYPOINT xvfb-run --server-args="-screen 0 1280x2000x24" npm start

EXPOSE 5000