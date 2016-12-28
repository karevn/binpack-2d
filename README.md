# Bin Pack 2D

*binpack-2d* is a simple 2-dimensional bin packing library. This library
packs objects of known width and height into the container of the finite or
infinite size.

# Installation

```
npm install binpack-2d
```

# Usage

```js
import binpack from 'binpack-2d'
const objects = [
  {width: 10, height: 10},
  {width: 20, height: 10},
  {width: 10, height: 20},
]
const container = {width: 30, height: Infinity}
const options = {... options }
const result = binpack(container, objects, options)
```

## Options available

#### align

default: `left`
values: `left`, `right`, `center`

If objects will be aligned if there's an empty space left.

#### inPlace
default: `false`

If `objects` will be modified in-place instead of returning new ones.


## Return value

If `inPlace` options is set to false:

```js
{
  width: 30,
  height: 20,
  items: {
    {width: 10, height: 10, x: 0, y: 0},
    {width: 20, height: 10, x: 10, y: 0},
    {width: 10, height: 20, x: 0, y: 10},
  },
}
```

If `inPlace` option is set to true:
```js
{
  width: 30,
  height: 20,
}
```

# Contributing

Any contributions are highly appreciated.

# License
MIT
