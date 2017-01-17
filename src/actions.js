
import webrtcConstants from './constants'

export const createPeer = webRTCOptions => ({
  type: webrtcConstants.INIT_WEBRTC,
  webRTCOptions
})

export const createWebRTC = webrtc => ({
  type: webrtcConstants.WEBRTC_CREATED,
  webrtc
})

export const peerError = error => ({
  type: webrtcConstants.PEER_ERROR,
  error
})

export const peerSignal = signal => ({
  type: webrtcConstants.PEER_SIGNAL,
  signal
})

export const peerConnected = isConnected => ({
  type: webrtcConstants.PEER_CONNECTED,
  isConnected
})

export const peerData = data => ({
  type: webrtcConstants.PEER_DATA,
  data
})

export const acceptSignal = signal => {
  if (typeof signal === 'string') signal = JSON.parse(signal)
  return {
    type: webrtcConstants.ACCEPT_SIGNAL,
    signal
  }
}

export const sendData = data => ({
  type: webrtcConstants.PEER_SEND_DATA,
  data
})

export const isCreatingPeer = ({ type }) =>
  type === webrtcConstants.INIT_WEBRTC

export const isAcceptingSignal = ({ type }) =>
  type === webrtcConstants.ACCEPT_SIGNAL

export const isSendingData = ({ type }) =>
  type === webrtcConstants.PEER_SEND_DATA
