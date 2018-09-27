# WalletConnect push server

Push server for [walletconnect](https://walletconnect.org) standard.

### Setup

```bash
$ git clone git@github.com:walletconnect/node-walletconnect-push.git
$ cd node-walletconnect-push
$ npm install
```

### Development

```bash
# create config.env and change it
# add FCM_API_KEY=<FCM_API_KEY> into config.env

$ npm run dev
```

### Production

```bash
# create config-production.env and change it
# add FCM_API_KEY=<FCM_API_KEY> into config-production.env

$ npm run build
$ npm start
```
