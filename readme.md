# Web scrapping using Nightmare

## Install nodejs
https://nodejs.org/en/download/   (use win installer)

## Install dependesies npm 
### start command
```
$ npm install --save-dev
$ npm audit fix
$ npm run start
```

## Open browser by link http://localhost:5000

# Start pm2
npm i -g pm2

pm2 start start.sh
pm2 log

- if server reboot
pm2 startup ubuntu

# Docker for mongo
docker pull mongo