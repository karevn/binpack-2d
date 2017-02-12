const Rect = require('./rect')
const find = require('array.prototype.find')

// functions for sorting rects in order
const sorters = {
    // top down, then left to right
    downwardLeftToRight: (a, b) => {
        return a.y - b.y || a.x - b.x
    },
    // left to right, then top down
    rightwardTopToBottom: (a, b) => {
        return a.x - b.x || a.y - b.y
    },
    leftwardTopToBottom: (a, b) => {
        return b.x - a.x || a.y - b.y
    },
    downwardRightToLeft: (a, b) => {
        return a.y - b.y || b.x - a.x
    }

}

function getMax(items, coord, dimension) {
    return items.reduce((value, item) => {
        if (item[coord] === undefined) {
            return value
        }
        return Math.max(value, item[coord] + item[dimension])
    }, 0)
}

function pack(size, items, gap) {
    if (gap === undefined) {
        gap = 0
    }
    const spaces = [{
        x: 0,
        y: 0,
        width: size.width || Infinity,
        height: size.height || Infinity
    }]

    return items.map((item) => {
        const positioned = {
            width: item.width || 0,
            height: item.height || 0
        }
        const space = find(spaces, (space) => {
            return Rect.fits(space, positioned)
        })
        if (space) {
            positioned.x = space.x
            positioned.y = space.y
            const overlapping = spaces.filter((space)=> {
                return Rect.overlaps(positioned, space)
            })
            overlapping.forEach((space)=> {
                spaces.splice(spaces.indexOf(space), 1)
                spaces.push.apply(spaces, Rect.subtract(space, positioned, gap))
            })
            Rect.merge(spaces)
            spaces.sort(sorters.downwardLeftToRight)
        }
        return positioned
    })
}

function getWidth(items) {
    return getMax(items, 'x', 'width')
}

function getHeight(items) {
    return getMax(items, 'y', 'height')
}

function align(size, items, align) {
    const width = getWidth(items)
    if (align == 'center')
        items.forEach((item) => {
            item.x += (size.width - width) / 2
        })
    else if (align == 'right') {
        items.forEach((item) => {
            item.x += size.width - width
        })
    }
}

module.exports = pack
Object.assign(module.exports, {getWidth, getHeight, align})
