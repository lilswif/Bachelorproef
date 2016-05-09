FROM ubuntu:trusty
MAINTAINER Frederik Van Brussel

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup | sudo bash -

RUN apt-get install -y \
  build-essential \
  nodejs \
  vim

RUN npm install npm -g

RUN npm install --global gulp-cli

WORKDIR /var/www/app

EXPOSE 8085

CMD ["gulp", "dev"]