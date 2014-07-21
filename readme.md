# medeadown[![build status](https://secure.travis-ci.org/kesla/medeadown.svg)](http://travis-ci.org/kesla/medeadown)

leveldown-compatible interface to medea (https://github.com/argo/medea)

[![NPM](https://nodei.co/npm/medeadown.png?downloads&stars)](https://nodei.co/npm/medeadown/)

[![NPM](https://nodei.co/npm-dl/medeadown.png)](https://nodei.co/npm/medeadown/)

## Installation

```
npm install medeadown
```

## Benchmark

Running on Macbook Air (mid 2012)

```
levelup + leveldown put(int, string) x 10 x 585 ops/sec ±2.09% (16 runs sampled)
levelup + medeadown put(int, string) x 10 x 530 ops/sec ±1.53% (20 runs sampled)

levelup + leveldown put(int, string) x 1000 x 47.33 ops/sec ±8.61% (16 runs sampled)
levelup + medeadown put(int, string) x 1000 x 22.01 ops/sec ±5.27% (15 runs sampled)

levelup + leveldown put(int, string) x 100000 x 0.50 ops/sec ±3.27% (5 runs sampled)
levelup + medeadown put(int, string) x 100000 x 0.19 ops/sec ±1.91% (5 runs sampled)

levelup + leveldown get(int):string x 10 x 602 ops/sec ±1.18% (18 runs sampled)
levelup + medeadown get(int):string x 10 x 602 ops/sec ±1.09% (14 runs sampled)

levelup + leveldown get(int):string x 1000 x 60.91 ops/sec ±3.12% (19 runs sampled)
levelup + medeadown get(int):string x 1000 x 61.05 ops/sec ±10.42% (18 runs sampled)

levelup + leveldown get(int):string x 100000 x 0.56 ops/sec ±5.64% (5 runs sampled)
levelup + medeadown get(int):string x 100000 x 0.49 ops/sec ±4.45% (5 runs sampled)

levelup + leveldown batch(int, string) x 10 x 625 ops/sec ±0.95% (13 runs sampled)
levelup + medeadown batch(int, string) x 10 x 442 ops/sec ±1.97% (16 runs sampled)

levelup + leveldown batch(int, string) x 1000 x 113 ops/sec ±4.41% (19 runs sampled)
levelup + medeadown batch(int, string) x 1000 x 46.10 ops/sec ±1.81% (19 runs sampled)

levelup + leveldown batch(int, string) x 100000 x 1.42 ops/sec ±5.11% (6 runs sampled)
levelup + medeadown batch(int, string) x 100000 x 0.40 ops/sec ±0.98% (5 runs sampled)

levelup + leveldown readStream x 10 x 550 ops/sec ±1.14% (22 runs sampled)
levelup + medeadown readStream x 10 x 531 ops/sec ±1.80% (21 runs sampled)

levelup + leveldown readStream x 1000 x 51.02 ops/sec ±3.13% (20 runs sampled)
levelup + medeadown readStream x 1000 x 37.91 ops/sec ±1.55% (16 runs sampled)

levelup + leveldown readStream x 100000 x 0.61 ops/sec ±5.97% (5 runs sampled)
levelup + medeadown readStream x 100000 x 0.39 ops/sec ±5.57% (5 runs sampled)
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

