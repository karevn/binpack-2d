const assert = require('assert')
const chai = require('chai')
const rect = require('../src/rect')
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect
describe('rect', function () {
  const space = {
    x: 0, y: 0, width: 5, height: 5
  }
  const centered = {
    x: 2, y: 2, width: 1, height: 1
  }
  const leftTop = {
    x: 0, y: 0, width: 1, height: 1
  }
  const bottomBar = {
    x: 0, y: 4, width: 5, height: 1
  }
  it('subtract centered without a gap', function() {
    expect([
      {x: 0, y: 0, width: 5, height: 2},
      {x: 3, y: 0, width: 2, height: 5},
      {x: 0, y: 3, width: 5, height: 2},
      {x: 0, y: 0, width: 2, height: 5}
    ]).to.shallowDeepEqual(rect.subtract(space, centered))
  })

  it('subtracts centered with a gap of 1', function() {
    expect([
      {x: 0, y: 0, width: 5, height: 1},
      {x: 4, y: 0, width: 1, height: 5},
      {x: 0, y: 4, width: 5, height: 1},
      {x: 0, y: 0, width: 1, height: 5}
    ]).to.shallowDeepEqual(rect.subtract(space, centered, 1))
  })

  it('bottom bar with gap of 1', function() {
    expect([
      {x: 0, y: 0, width: 5, height: 3},
    ]).to.shallowDeepEqual(rect.subtract(space, bottomBar, 1))
  })
})
