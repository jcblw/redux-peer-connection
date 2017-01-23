
module.exports.createStore = function createStore (options = {}) {
  return {
    getState () {
      return {
        peer: {
          _peer: options.peer
        }
      }
    },
    dispatch (...args) {
      options.dispatch(...args)
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
