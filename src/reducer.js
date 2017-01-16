
import { combineReducers } from 'redux'
import webrtcConstants from './constants'
import local from './local-store'

export function isInitialized (state = false, action) {
  if (action.type === webrtcConstants.INIT_WEBRTC) {
    return true
  }
  return state
}

export function _peer (state = null, action) {
  if (action.type !== webrtcConstants.WEBRTC_CREATED) return state
  return action.webrtc
}

export function channel (state = null, action) {
  if (action.type !== webrtcConstants.INIT_WEBRTC) return state
  return action.webRTCOptions.channelName
}

export function isConnected (state = false, action) {
  if (action.type !== webrtcConstants.PEER_CONNECTED) return state
  return action.isConnected
}

export function offer (state = null, action) {
  if (
    action.type !== webrtcConstants.PEER_SIGNAL ||
    action.signal.type !== 'offer'
  ) return state
  return action.signal
}

export function answer (state = null, action) {
  if (
    action.type !== webrtcConstants.PEER_SIGNAL ||
    action.signal.type !== 'answer'
  ) return state
  return action.signal
}

export function data (state = [], action) {
  if (action.type !== webrtcConstants.PEER_DATA) return state
  return [...state, action.data.toString()]
}

export const createReducer = (keyName) => {
  if (keyName !== undefined) {
    local.keyName = keyName
  }
  return combineReducers({
    _peer,
    channel,
    isConnected,
    isInitialized,
    offer,
    answer,
    data
  })
}
