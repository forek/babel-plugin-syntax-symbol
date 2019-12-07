const assert = require('assert')
const babel7 = require('@babel/core')
const plugin = require('../index')

function transform (code) {
  return babel7.transform(code, {
    plugins: [plugin]
  }).code
}

describe('Basic syntax test:', () => {
  it(':name', () => {
    const input = 'const foo = :baz;'
    const expected = 'const foo = Symbol.for("baz");'
    assert.equal(transform(input), expected)
  })

  it(':_name', () => {
    const input = 'const foo = :_baz;'
    const expected = 'const foo = Symbol.for("_baz");'
    assert.equal(transform(input), expected)
  })

  it(':"string"', () => {
    const input = 'const foo = :"_baz";'
    const expected = 'const foo = Symbol.for("_baz");'
    assert.equal(transform(input), expected)
  })

  it(':\'string\'', () => {
    const input = 'const foo = :\'_baz\';'
    const expected = 'const foo = Symbol.for("_baz");'
    assert.equal(transform(input), expected)
  })
})

describe('Compatibility test:', () => {
  it('true ? :foo : :baz', () => {
    const input = 'const foo = true ? :foo : :baz;'
    const expected = 'const foo = true ? Symbol.for("foo") : Symbol.for("baz");'
    assert.equal(transform(input), expected)
  })

  it('{ [:foo]: :baz }', () => {
    const input = 'const foo = { [:foo]: :baz }'
    const expected = 'const foo = {\n  [Symbol.for("foo")]: Symbol.for("baz")\n};'
    assert.equal(transform(input), expected)
  })

  it(`class A { [:foo] () {} }`, () => {
    const input = 'const A = class A { [:foo] () {} }'
    const expected = 'const A = class A {\n  [Symbol.for("foo")]() {}\n\n};'
    assert.equal(transform(input), expected)
  })
})