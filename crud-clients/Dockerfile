FROM node:lts
# ENV NODE_ENV=production

# RUN mkdir /build
WORKDIR /build

COPY ./ /build/actividad-13/crud-clients

RUN cd /build/actividad-13/crud-clients && npm install

WORKDIR /build/actividad-13/crud-clients

EXPOSE 3000

# RUN npm --prefix /build/actividad-13/crud-clients/ run dev

CMD ["npm", "run", "dev"]
