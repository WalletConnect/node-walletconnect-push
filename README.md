# WalletConnect Push Server

Push Server for triggering WalletConnect notifications

## Development

```bash
yarn dev
```

## Production

### Using NPM

1. Build

```bash
yarn build
```

2. Production

```bash
yarn start
```

3. Server accessible from host:

```bash
http://localhost:5000/
```

### Using Docker

1. Build the container with:

```bash
make build-docker
```

2. Run the container with:

```bash
docker run -p 5000:5000 -e REDIS_URL=redis://192.168.1.53:6379/0 walletconnect/node-walletconnect-push
```

3. Server accessible from host:

```bash
http://localhost:5000/
```
