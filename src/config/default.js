import path from 'path'
import dotenv from 'dotenv'

// load config env
let root = path.normalize(`${__dirname}/../..`)
const fileName =
  process.env.NODE_ENV === 'production'
    ? '/config-production.env'
    : '/config.env'
const configFile = `${root}${fileName}`
dotenv.config({ path: configFile, silent: true })

export default {
  env: process.env.NODE_ENV || 'development',
  debug: process.env.NODE_ENV !== 'production',
  app: {
    name: process.env.APP_NAME || 'WalletConnect Push Server',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || 5002, 10)
  },
  fcm: {
    url: process.env.FCM_URL || 'https://fcm.googleapis.com/fcm/send',
    apiKey: process.env.FCM_API_KEY || ''
  }
}
