'use strict'

const RNPTypes = ['notification']

const checker = {
  notification () {
    switch (Notification.permission) {
      case 'granted':  return Promise.resolve('authorized')
      case 'denied':  return Promise.resolve('denied')
      default: return Promise.resolve('undetermined')
    }
  }
}

const requestor = {
  async notification ()  {
    const permission = await Notification.requestPermission()
    switch (permission) {
      case 'granted':  return Promise.resolve('authorized')
      case 'denied':  return Promise.resolve('denied')
      default: return Promise.resolve('undetermined')
    }
  }
}

module.exports = {
  canOpenSettings () {
    return false
  },

  openSettings () {},

  getTypes () {
    return RNPTypes
  },

  check (permission, type) {
    return checker[permission]
      ? checker[permission]()
      : Promise.resolve('denied')
  },

  request (permission, type) {
    return requestor[permission]
      ? requestor[permission]()
      : Promise.resolve('denied')
  }
}
