# Redux peer connection

Redux peer connection is a set of redux tools that enable peer to peer connections between two browsers. It uses [`simple peer`](https://github.com/feross/simple-peer) under the hood.

## Includes

- reducer
- middleware
- action creators

## Usage

Attaching it to the redux store.

```javascript
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createReducer, middleware} from 'redux-peer-connection'

export const configStore = preload => {
  return createStore(
    combineReducers({
      peer: createReducer('peer') // create reducer with the key of peer
    }),
    preload,
    applyMiddleware(
      middleware // add middleware to redux
    )
  )
}
```

This should setup a key in your reducer, with some info about the peer connection in it.

#### Whats info is available

```javascript
{
  channel: null, // the channel name eg. 'foo'
  isConnected: false, // the state of the connection
  isInitialized: false, // if a peer was created or not
  offer: null, // RTCPeerConnection.createOffer
  answer: null, // RTCPeerConnection.createAnswer
  data: [], // if data is being passed this will be an array of buffers
  stream: null // if video/audio is being passed this will be the incoming stream
}
```

#### Available action creators

To import action creators.

```javascript
import {actions} from 'redux-peer-connection'
```

##### `createPeer`

Creates a peer connection, object passed to this function is then passed to a new instance of [`SimplePeer`](https://github.com/feross/simple-peer#usage)

```javascript
actions.createPeer({
  initiator: true,
  channelName: 'my-p2p-app'
})
```

##### `acceptSignal`

Once somehow getting a signal from other peer. This can be an [answer](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer), [offer](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer), or [ice canidate](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/WebRTC_basics#ICECandidate)

```javascript
actions.acceptSignal({
  type: 'offer',
  sdp: 'v=0\r\n...'
})
```

##### `sendData`

Once a connection is established, you can send data to the other peer via this method.

```javascript
actions.sendData('hello, this is peer')
```

## Contribute

We use [`standard`](https://github.com/feross/standard) and make sure to run `npm test` before making a PR.
