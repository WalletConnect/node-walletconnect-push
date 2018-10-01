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

// get message body for given dapp name
function getMessageBody(dappName) {
  return `New call request from ${dappName}`
}

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
  const { pushType, pushToken, sessionId, callId, dappName } = req.body
  if (!pushType || !pushToken || !sessionId || !callId || !dappName) {
    return res.status(412).json({
      message: 'fcmToken, sessionId, callId and dappName required'
    })
  }
  if (pushType.toLowerCase() === 'fcm') {
    // fcm payload
    const fcmPayload = {
      to: pushToken,
      data: { sessionId, callId, dappName },
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
  } else {
    return res.status(400).json({
      message: `Push type ${pushType} is not suported`
    })
  }
})

//
// Main router
//

// add transaction status router to main Router
router.use('/notification', notificationRouter)

// main router
export default router
