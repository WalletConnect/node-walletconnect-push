import { Router } from 'express'
import axios from 'axios'

import config from './config'

// notification axios
const notificationAxios = axios.create({
  baseURL: config.fcm.url,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `key=${config.fcm.apiKey}`
  }
})

//
// Router
//

// create router
const router = Router()

//
// Notification
//

const notificationRouter = Router({ mergeParams: true })
notificationRouter.post('/new', async(req, res) => {
  const { fcmToken, sessionId, transactionId, dappName } = req.body
  if (!fcmToken || !sessionId || !transactionId || !dappName) {
    return res.status(412).json({
      message: 'fcmToken, sessionId, transactionId and dappName required'
    })
  }
  // fcm payload
  const fcmPayload = {
    to: fcmToken,
    data: { sessionId, transactionId, dappName },
    notification: {
      body: getMessageBody(dappName)
    }
  }

  try {
    const response = await notificationAxios.post('', fcmPayload)
    // check status
    if (
      response.status === 200 &&
      response.data &&
      response.data.success === 1
    ) {
      return res.json({
        success: true
      })
    }
  } catch (e) {
    return res.status(400).json({
      message: 'Error while sending notification'
    })
  }
  return res.status(400).json({
    message: 'FCM server error, push notification failed'
  })
})

//
// Main router
//

// add transaction status router to main Router
router.use('/notification', notificationRouter)

// main router
export default router
