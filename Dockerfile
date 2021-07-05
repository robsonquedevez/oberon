FROM node

WORKDIR /home/app

COPY . .

VOLUME [ "/data" ]

EXPOSE 4004

CMD [ "node", "server.js" ]

