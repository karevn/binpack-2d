/* global it, describe */
import chai from 'chai'
const expect = chai.expect
chai.use(require('chai-shallow-deep-equal'))

import pack from '../src/pack'
import {
    getWidth,
    getHeight
} from '../src/pack'

describe('pack', function() {
    it('should pack simple rects', function() {
        const space = {
            width: 5,
            height: 5
        }
        const items = [{
            width: 1,
            height: 1
        }, {
            width: 1,
            height: 2
        }, {
            width: 1,
            height: 2
        }, {
            width: 1,
            height: 1
        }, {
            width: 1,
            height: 1
        }, {
            width: 2,
            height: 1
        } ]
        const packed = pack(space, items, 1)
        expect(packed).to.shallowDeepEqual([{
            x: 0,
            y: 0,
            width: 1,
            height: 1
        }, {
            x: 2,
            y: 0,
            width: 1,
            height: 2
        }, {
            x: 4,
            y: 0,
            width: 1,
            height: 2
        }, {
            x: 0,
            y: 2,
            width: 1,
            height: 1
        }, {
            x: 2,
            y: 2,
            width: 1,
            height: 1
        }, {
            x: 0,
            y: 4,
            width: 2,
            height: 1
        }])
        expect(getHeight(packed)).to.equal(5)
    })

    it('should not fail on full rows', function() {
        const space = {
            width: 3,
            height: 2
        }
        const items = [{
            width: 3,
            height: 1
        }, {
            width: 1,
            height: 1
        }, {
            width: 1,
            height: 1
        } ]
        const packed = pack(space, items)
        expect(getWidth(packed)).to.equal(3)
        expect(getHeight(packed)).to.equal(2)
    })

    it('should not lay out items those do not fit', function() {
        const space = {
            width: 2,
            height: 1
        }
        const items = [{
            width: 2,
            height: 1
        }, {
            width: 1,
            height: 1
        } ]
        const packed = pack(space, items, {
            align: 'left'
        })
        expect(packed[1].x).to.be.undefined
        expect(packed[1].y).to.be.undefined
    })
})
