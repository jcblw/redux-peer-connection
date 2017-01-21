
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
function createPeerConstruct (options = peerOptions) {
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
  }
}

module.exports.createPeerConstruct = createPeerConstruct
