module.exports.basicActionCreatorTest = (test) => (methodName, context, constant, key) => {
  test(
    `the "${methodName}" action creator`,
    t => {
      t.plan(3)
      t.is(typeof context[methodName], 'function', `the "${methodName}" action creator is a function`)
      t.deepEqual(
        context[methodName](),
        {
          type: constant,
          [key]: undefined
        },
        `the "${methodName}" action creates an object with the correct type of "${constant}"`
      )
      t.deepEqual(
        context[methodName]({ foo: 'bar' }),
        {
          type: constant,
          [key]: { foo: 'bar' }
        },
        `the "${methodName}" action creates an object with first param as the key "${key}"`
      )
    }
  )
}
