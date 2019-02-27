FROM node:11-alpine

# minimal apk dependencies to be safe
ENV PACKAGES="curl ca-certificates" NODE_ENV="production" HOST="0.0.0.0:5000"

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN apk add --no-cache $PACKAGES && \
    yarn --prod

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]
