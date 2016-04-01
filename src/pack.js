import * as Rect from './rect'

// functions for sorting rects in order
const sorters = {
  // top down, then left to right
  downwardLeftToRight: (a, b) => { return a.y - b.y || a.x - b.x; },
  // left to right, then top down
  rightwardTopToBottom: (a, b) => { return a.x - b.x || a.y - b.y; },
};


export default function pack(size, items, options) {
  let defaults = {
    align: 'center',
    inPlace: false,
    gap: 0
  }
  Object.assign(defaults, options)
  options = defaults
  const spaces = [{
    x: 0,
    y: 0,
    width: size.width || Infinity,
    height: size.height || Infinity,
  }];
  const packed = items.map((item) => {
    const positioned = {
      width: item.width || 0,
      height: item.height || 0,
    };
    const containingSpaces = spaces.filter((space) => {
      return Rect.fits(space, positioned);
    });
    if (containingSpaces.length > 0) {
      positioned.x = containingSpaces[0].x;
      positioned.y = containingSpaces[0].y;
      containingSpaces.forEach((space)=> {
        spaces.splice(spaces.indexOf(space), 1);
        spaces.push.apply(spaces, Rect.subtract(space, positioned, options.gap));
        Rect.merge(spaces);
        spaces.sort(sorters.downwardLeftToRight);
      })
    }
    return positioned;
  });
  const maxWidth = packed.reduce((width, item)=> {
    return Math.max(width, item.x + item.width);
  }, 0);
  const maxHeight = packed.reduce((height, item)=> {
    return Math.max(height, item.top + item.height)
  }, 0);
  if (options.align == 'center')
    packed.forEach((item)=> {
      item.x += (size.width - maxWidth) / 2;
    })
  else if (options.align == 'right') {
    packed.forEach((item)=> {
      item.x += size.width - maxWidth;
    })
  }
  if (options.inPlace) {
    items.forEach((item, index)=> {
      Object.assign(item, packed[index]);
    });
  }
  return {
    width: maxWidth,
    height: maxHeight,
    items: options.inPlace ? undefined : packed,
  };
}
