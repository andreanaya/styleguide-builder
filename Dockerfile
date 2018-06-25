FROM node:latest
RUN mkdir -p /app /app/views
WORKDIR /app
ADD ./server/package.json /app
RUN npm install
COPY ./server /app
COPY ./shared/views /app/views