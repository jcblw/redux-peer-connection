import test from 'ava'
import * as actions from '../lib/actions'
import {basicActionCreatorTest} from './utils'

const createTest = basicActionCreatorTest(test)

createTest('createPeer', actions, 'INIT_WEBRTC', 'webRTCOptions')
createTest('createWebRTC', actions, 'WEBRTC_CREATED', 'webrtc')
createTest('peerError', actions, 'PEER_ERROR', 'error')
createTest('peerSignal', actions, 'PEER_SIGNAL', 'signal')
createTest('peerConnected', actions, 'PEER_CONNECTED', 'isConnected')
createTest('peerData', actions, 'PEER_DATA', 'data')
createTest('sendData', actions, 'PEER_SEND_DATA', 'data')
createTest('acceptSignal', actions, 'ACCEPT_SIGNAL', 'signal')

test(
  'the "acceptSignal" parsing of an string',
  t => {
    const json = {foo: 'bar'}
    t.plan(1)
    t.deepEqual(
      actions.acceptSignal(JSON.stringify(json)).signal,
      json,
      'the string version of the "signal" is parsed to an object'
    )
  }
)

test(
  'the "isCreatingPeer" utility',
  t => {
    t.plan(2)
    t.true(
      actions.isCreatingPeer(actions.createPeer()),
      'when the action from "createPeer" is passed to "isCreatingPeer" returns true'
    )
    t.false(
      actions.isCreatingPeer({}),
      'when the a random action is passed to "isCreatingPeer" returns false'
    )
  }
)

test(
  'the "isAcceptingSignal" utility',
  t => {
    t.plan(2)
    t.true(
      actions.isAcceptingSignal(actions.acceptSignal({})),
      'when the action from "acceptSignal" is passed to "isAcceptingSignal" returns true'
    )
    t.false(
      actions.isCreatingPeer({}),
      'when the a random action is passed to "isAcceptingSignal" returns false'
    )
  }
)

test(
  'the "isSendingData" utility',
  t => {
    t.plan(2)
    t.true(
      actions.isSendingData(actions.sendData('foo')),
      'when the action from create peer is passed to "isSendingData" returns true'
    )
    t.false(
      actions.isSendingData({}),
      'when the a random action is passed to "isSendingData" returns false'
    )
  }
)
