import {fits, overlaps, subtract, merge } from './rect'
const find = require('array.prototype.find')


function getMax(items, coord, dimension) {
    return items.reduce((value, item) => {
        if (item[coord] === undefined) {
            return value
        }
        return Math.max(value, item[coord] + item[dimension])
    }, 0)
}

function getStrategy(rtl) {
    return rtl
        ?   {
            sorter: (a, b) => a.y - b.y || a.x - b.x,
            place: (positioned, space) => {
                positioned.x = space.x + space.width - positioned.width,
                positioned.y = space.y
            }
        }
        :   {
            sorter: (a, b) => a.y - b.y || a.x - b.x,
            place: (positioned, space) => {
                positioned.x = space.x,
                positioned.y = space.y
            }
        }
}

function pack(size, items, gap, rtl) {
    if (gap === undefined) {
        gap = 0
    }
    const spaces = [{
        x: 0,
        y: 0,
        width: size.width || Infinity,
        height: size.height || Infinity
    }]
    const strategy = getStrategy(rtl)
    return items.map((item) => {
        const positioned = {
            width: item.width || 0,
            height: item.height || 0
        }
        const space = find(spaces, (space) => {
            return fits(space, positioned)
        })
        if (space) {
            strategy.place(positioned, space)
            const overlapping = spaces.filter((space)=> {
                return overlaps(positioned, space)
            })
            overlapping.forEach((space)=> {
                spaces.splice(spaces.indexOf(space), 1)
                spaces.push.apply(spaces, subtract(space, positioned, gap))
            })
            merge(spaces)
            spaces.sort(strategy.sorter)
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

export default pack
