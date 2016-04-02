import * as Rect from './rect'

// functions for sorting rects in order
const sorters = {
    // top down, then left to right
    downwardLeftToRight: (a, b) => {
        return a.y - b.y || a.x - b.x
    },
    // left to right, then top down
    rightwardTopToBottom: (a, b) => {
        return a.x - b.x || a.y - b.y
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

export default function pack(size, items, gap) {
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
        const containingSpaces = spaces.filter((space) => {
            return Rect.fits(space, positioned)
        })
        if (containingSpaces.length > 0) {
            positioned.x = containingSpaces[0].x
            positioned.y = containingSpaces[0].y
            containingSpaces.forEach((space) => {
                spaces.splice(spaces.indexOf(space), 1)
                spaces.push.apply(spaces, Rect.subtract(space, positioned, gap))
                Rect.merge(spaces)
                spaces.sort(sorters.downwardLeftToRight)
            })
        }
        return positioned
    })
}

export function getWidth(items) {
    return getMax(items, 'x', 'width')
}

export function getHeight(items) {
    return getMax(items, 'y', 'height')
}

export function align(size, items, align) {
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
