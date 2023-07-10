FROM node


WORKDIR /src

COPY . .

EXPOSE 9595

CMD node index.js