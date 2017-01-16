
import SimplePeer from 'simple-peer'
import {
  isCreatingPeer,
  createWebRTC,
  peerError,
  peerSignal,
  peerConnected,
  peerData,
  isAcceptingSignal,
  isSendingData
} from './actions'
import local from './local-store'

const noPeerError = (method) =>
  new Error(`Cannot call ${method} before a peer is created. See method action "createPeer"`)

export function getPeer (store) {
  return store.getState()[local.keyName]._peer
}

export function createPeer (dispatch, webRTCOptions) {
  const peer = new SimplePeer(webRTCOptions)
  peer.on('error', err => dispatch(peerError(err)))
  peer.on('signal', signal => dispatch(peerSignal(signal)))
  peer.on('connect', () => dispatch(peerConnected(true)))
  peer.on('data', data => dispatch(peerData(data)))
  dispatch(createWebRTC(peer))
}

export function acceptOffer (offer, peer) {
  if (!peer) throw noPeerError('acceptOffer')
  peer.signal(offer)
}

export function sendData (data, peer) {
  if (!peer) throw noPeerError('sendData')
  peer.send(data)
}

export const middleware = store => next => action => {
  next(action)
  if (action.type === 'PEER_SIGNAL') console.log(JSON.stringify(action.signal))
  if (isCreatingPeer(action) && !getPeer(store)) {
    return createPeer(store.dispatch, action.webRTCOptions)
  }
  if (isAcceptingSignal(action)) {
    return acceptOffer(action.signal, getPeer(store))
  }

  if (isSendingData(action)) {
    return sendData(action.data, getPeer(store))
  }
}
