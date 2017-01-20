import test from 'ava'
import * as reducerFns from '../lib/reducer'
import local from '../lib/local-store'

test(
  'the "createReducer" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.createReducer, 'function', '"createReducer" is a function')
    t.is(typeof reducerFns.createReducer(), 'function', '"createReducer" returns a function')
    reducerFns.createReducer('foo')
    t.is(local.keyName, 'foo', '"createReducer" will change the local var "keyName" to first param passed')
  }
)

test(
  'the "data" function',
  t => {
    t.plan(5)
    t.is(typeof reducerFns.data, 'function', '"data" is a function')
    t.true(Array.isArray(reducerFns.data(undefined, {})), '"data" by default returns an array')
    t.is(reducerFns.data(undefined, {}).length, 0, '"data" returns an empty array')
    const ret = reducerFns.data([], {type: 'PEER_DATA', data: 'foo'})
    t.is(ret.length, 1, '"data" returns an array with an item appended to the state')
    t.is(ret[0], 'foo', 'the correct data is in the first slot')
  }
)

test(
  'the "stream" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.stream, 'function', '"stream" is a function')
    t.is(reducerFns.stream(undefined, {}), null, '"stream" by default returns null')
    const ret = reducerFns.stream(undefined, {type: 'PEER_STREAM', stream: 'foo'})
    t.is(ret, 'foo', 'the correct data is in the first slot')
  }
)

test(
  'the "answer" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.answer, 'function', '"answer" is a function')
    t.is(reducerFns.answer(undefined, {}), null, '"answer" by default returns null')
    const signal = { type: 'answer' }
    const ret = reducerFns.answer(undefined, {type: 'PEER_SIGNAL', signal})
    t.is(ret, signal, 'the correct data is in the first slot')
  }
)

test(
  'the "offer" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.offer, 'function', '"offer" is a function')
    t.is(reducerFns.offer(undefined, {}), null, '"offer" by default returns null')
    const signal = { type: 'offer' }
    const ret = reducerFns.offer(undefined, {type: 'PEER_SIGNAL', signal})
    t.is(ret, signal, 'the correct data is in the first slot')
  }
)

test(
  'the "isConnected" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.isConnected, 'function', '"isConnected" is a function')
    t.is(reducerFns.isConnected(undefined, {}), false, '"isConnected" by default returns false')
    const ret = reducerFns.isConnected(undefined, {type: 'PEER_CONNECTED', isConnected: true})
    t.true(ret, 'the correct data is in the first slot')
  }
)

test(
  'the "channel" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.channel, 'function', '"channel" is a function')
    t.is(reducerFns.channel(undefined, {}), null, '"channel" by default returns null')
    const ret = reducerFns.channel(undefined, {type: 'INIT_WEBRTC', webRTCOptions: {channelName: 'foo'}})
    t.is(ret, 'foo', 'the correct data is in the first slot')
  }
)

test(
  'the "_peer" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns._peer, 'function', '"_peer" is a function')
    t.is(reducerFns._peer(undefined, {}), null, '"_peer" by default returns null')
    const ret = reducerFns._peer(undefined, {type: 'WEBRTC_CREATED', webrtc: 'foo'})
    t.is(ret, 'foo', 'the correct data is in the first slot')
  }
)

test(
  'the "isInitialized" function',
  t => {
    t.plan(3)
    t.is(typeof reducerFns.isInitialized, 'function', '"isInitialized" is a function')
    t.is(reducerFns.isInitialized(undefined, {}), false, '"isInitialized" by default returns false')
    const ret = reducerFns.isInitialized(undefined, {type: 'INIT_WEBRTC'})
    t.true(ret, 'the correct data is in the first slot')
  }
)
