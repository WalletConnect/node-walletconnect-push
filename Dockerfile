FROM node:11-alpine

# minimal apk dependencies to be safe
ENV NODE_ENV=production PACKAGES="curl ca-certificates"

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN apk add --no-cache $PACKAGES && \
    yarn --prod

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]
