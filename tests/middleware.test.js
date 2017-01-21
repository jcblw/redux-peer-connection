import test from 'ava'
import * as middlewareFns from '../lib/middleware'
import scaffold from './scaffold'

const { store } = scaffold

test(
  'the "middleware" function',
  t => {
    t.plan(1)
    t.is(typeof middlewareFns.middleware, 'function', 'the "middleware" export is a function')
  }
)

test(
  'the "noPeerError" function',
  t => {
    const { noPeerError } = middlewareFns
    t.plan(4)
    t.is(typeof noPeerError, 'function', 'the "noPeerError" export is a function')
    t.truthy(noPeerError().message, 'the return from "noPeerError" has a message')
    t.truthy(noPeerError().stack, 'the return from "noPeerError" has a message')
    t.regex(noPeerError('foo').message, /foo/g, 'the "noPeerError" returns an error with the passed param in it')
  }
)

test(
  'the "getPeer" function',
  t => {
    const { getPeer } = middlewareFns
    t.plan(3)
    t.is(typeof getPeer, 'function', 'the "getPeer" export is a function')
    t.throws(() => getPeer(), /getState/g, 'You are unable to call "getPeer" with no params')
    t.is(getPeer(store), 'foo', 'The correct key is grabed from the store')
  }
)

test(
  'the "createPeer" function',
  t => {
    const { createPeer } = middlewareFns
    t.plan(8)
    t.is(typeof createPeer, 'function', 'the "createPeer" export is a function')
    const options = { foo: 'bar' }
    const peerOptions = { constuctorOptions: {}, listeners: {} }
    const Peer = scaffold.createPeerConstruct(peerOptions)
    let _ret
    const dispatch = x => { _ret = x }
    createPeer(dispatch, options, Peer)
    t.true(_ret.webrtc instanceof Peer, 'the return of the "createPeer" function is a instance of "Peer"')
    t.is(_ret.type, 'WEBRTC_CREATED', 'the action created in the first dispactch is the "WEBRTC_CREATED" action')
    t.truthy(peerOptions.listeners.error, 'there is a "error" handler attched to the peer')
    t.truthy(peerOptions.listeners.signal, 'there is a "signal" handler attched to the peer')
    t.truthy(peerOptions.listeners.data, 'there is a "data" handler attched to the peer')
    t.truthy(peerOptions.listeners.stream, 'there is a "stream" handler attched to the peer')
    t.truthy(peerOptions.listeners.connect, 'there is a "connect" handler attched to the peer')
  }
)
