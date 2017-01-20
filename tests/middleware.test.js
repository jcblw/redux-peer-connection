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
