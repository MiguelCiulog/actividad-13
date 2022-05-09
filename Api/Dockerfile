# syntax=docker/dockerfile:1

FROM golang:latest

RUN mkdir /build
WORKDIR /build

# RUN cd /build && git clone https://github.com/MiguelCiulog/actividad-13.git
COPY ./ /build/actividad-13/Api

RUN cd /build/actividad-13/Api && go build -o api

EXPOSE 8080

CMD ["/build/actividad-13/Api/api"]