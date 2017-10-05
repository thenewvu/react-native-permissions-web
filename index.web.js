'use strict'

const RNPTypes = ['notification', 'microphone', 'camera']

const notificationPermissionMap = p => {
  switch (p) {
    case 'granted': return 'authorized'
    case 'denied': return 'denied'
    default: return 'undetermined'
  }
}

const checker = {
  notification () {
    return notificationPermissionMap(
      Notification.permission
    )
  }
}

const requestor = {
  notification ()  {
    return Notification.requestPermission()
      .then(notificationPermissionMap)
  },
  microphone () {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => 'authorized')
      .catch(() => 'undetermined')
  },
  camera () {
    return navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => 'authorized')
      .catch(() => 'undetermined')
  }
}

module.exports = {
  canOpenSettings () {
    return false
  },

  openSettings () { },

  getTypes () {
    return RNPTypes
  },

  check (permission, type) {
    return checker[permission]
      ? checker[permission]()
      : Promise.reject(new Error(
        `${permission} not supported`
      ))
  },

  request (permission, type) {
    return requestor[permission]
      ? requestor[permission]()
      : Promise.reject(new Error(
        `${permission} not supported`
      ))
  }
}
