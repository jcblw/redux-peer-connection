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
    t.is(typeof reducerFns.data, 'function', '"data" is a function')
    t.true(Array.isArray(reducerFns.data(undefined, {})), '"data" by default returns a function')
    t.is(reducerFns.data(undefined, {}).length, 0, '"data" returns an empty array')
    const ret = reducerFns.data([], {type: 'PEER_DATA', data: 'foo'})
    t.is(ret.length, 1, '"data" returns an array with an item appended to the state')
    t.is(ret[0], 'foo', 'the correct data is in the first slot')
  }
)
