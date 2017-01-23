
module.exports.store = {
  getState () {
    return {
      peer: {
        _peer: 'foo'
      }
    }
  }
}

const peerOptions = { constuctorOptions: {}, listeners: {} }
module.exports.createPeerConstruct = function createPeerConstruct (options = peerOptions) {
  return class PeerMock {
    constructor (opts) {
      Object.assign(
        options.constuctorOptions,
        opts
      )
    }

    on (key, callback) {
      options.listeners[key] = callback
    }

    signal (...args) {
      options.signal(...args)
    }

    send (...args) {
      options.send(...args)
    }
  }
}
