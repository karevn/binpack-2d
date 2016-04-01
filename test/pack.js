import assert from 'assert'
import chai from 'chai'
const expect = chai.expect
chai.use(require('chai-shallow-deep-equal'));

import pack from '../src/pack'

describe('pack', function () {
  it('should pack simple rects', function() {
    const space = {
      width: 5,
      height: 5
    }
    const items = [
      {width: 1, height: 1},
      {width: 1, height: 2},
      {width: 1, height: 2},
      {width: 1, height: 1},
      {width: 1, height: 1},
      {width: 2, height: 1},
    ]
    const packed = pack(space, items, {align: 'left', gap: 1})
    expect(packed.items).to.shallowDeepEqual([
      {x: 0, y: 0, width: 1, height: 1},
      {x: 2, y: 0, width: 1, height: 2},
      {x: 4, y: 0, width: 1, height: 2},
      {x: 0, y: 2, width: 1, height: 1},
      {x: 2, y: 2, width: 1, height: 1},
      {x: 0, y: 4, width: 2, height: 1}
    ])
    expect(packed.height).to.equal(5)
  })
})
