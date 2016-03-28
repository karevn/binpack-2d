const Rect = require('./rect');

// functions for sorting rects in order
const sorters = {
  // top down, then left to right
  downwardLeftToRight: (a, b) => { return a.y - b.y || a.x - b.x; },
  // left to right, then top down
  rightwardTopToBottom: (a, b) => { return a.x - b.x || a.y - b.y; },
};


function find(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }
}

export default function pack(size, items, options) {
  let defaults = {
    align: 'center',
    inPlace: false
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
      x: item.x || 0,
      y: item.y || 0,
      width: item.width || 0,
      height: item.height || 0,
    };
    const spaceIndex = find(spaces, (space) => {
      return Rect.fits(space, positioned);
    });
    const space = spaces[spaceIndex];
    if (space) {
      positioned.x = space.x;
      positioned.y = space.y;
      spaces.splice(spaces.indexOf(space), 1);
      spaces.push.apply(spaces, Rect.subtract(space, positioned));
      Rect.merge(spaces);
      spaces.sort(sorters.downwardLeftToRight);
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
