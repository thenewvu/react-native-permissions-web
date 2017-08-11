'use strict'

const RNPTypes = ['location', 'camera', 'microphone', 'photo', 'contacts', 'event', 'reminder', 'bluetooth', 'notification', 'backgroundRefresh', 'speechRecognition']

module.exports = {
  canOpenSettings() {
    return false
  },

  openSettings() {},

  getTypes() {
    return RNPTypes
  },

  check(permission, type) {
    return Promise.resolve('authorized')
  },

  request(permission, type) {
    return Promise.resolve('authorized')
  },

  checkMultiple(permissions) {
    return Promise.resolve(permissions.reduce((pre, cur) => ({ ...pre, [cur]: 'authorized' }), {}))
  }
}
