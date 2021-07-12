FROM node:12.18.3-stretch-slim as build-env
LABEL desc="docker image of angular 9 app"
WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
#ENTRYPOINT ["ng","--version"]
RUN ng build
CMD ng serve 