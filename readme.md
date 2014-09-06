# medeadown[![build status](https://secure.travis-ci.org/medea/medeadown.svg)](http://travis-ci.org/medea/medeadown)[![Build status](https://ci.appveyor.com/api/projects/status/0trcea0djn8x7bhg/branch/master)](https://ci.appveyor.com/project/medea/medeadown/branch/master)

leveldown-compatible interface to medea (https://github.com/medea/medea)

[![NPM](https://nodei.co/npm/medeadown.png?downloads&stars)](https://nodei.co/npm/medeadown/)

[![NPM](https://nodei.co/npm-dl/medeadown.png)](https://nodei.co/npm/medeadown/)

## Installation

```
npm install medeadown
```

## Benchmark

Running on Macbook Air (mid 2012)

```
levelup + leveldown put(int, string) x 10 x 579 ops/sec ±3.79% (19 runs sampled)
levelup + medeadown put(int, string) x 10 x 516 ops/sec ±3.56% (20 runs sampled)

levelup + leveldown put(int, string) x 1000 x 48.83 ops/sec ±6.30% (19 runs sampled)
levelup + medeadown put(int, string) x 1000 x 29.21 ops/sec ±23.44% (17 runs sampled)

levelup + leveldown put(int, string) x 100000 x 0.44 ops/sec ±4.67% (5 runs sampled)
levelup + medeadown put(int, string) x 100000 x 0.23 ops/sec ±33.01% (5 runs sampled)

levelup + leveldown get(int):string x 10 x 611 ops/sec ±2.18% (13 runs sampled)
levelup + medeadown get(int):string x 10 x 604 ops/sec ±2.11% (16 runs sampled)

levelup + leveldown get(int):string x 1000 x 54.91 ops/sec ±4.41% (17 runs sampled)
levelup + medeadown get(int):string x 1000 x 55.87 ops/sec ±4.13% (18 runs sampled)

levelup + leveldown get(int):string x 100000 x 0.47 ops/sec ±3.70% (5 runs sampled)
levelup + medeadown get(int):string x 100000 x 0.40 ops/sec ±6.38% (5 runs sampled)

levelup + leveldown batch(int, string) x 10 x 645 ops/sec ±1.64% (20 runs sampled)
levelup + medeadown batch(int, string) x 10 x 451 ops/sec ±3.40% (21 runs sampled)

levelup + leveldown batch(int, string) x 1000 x 109 ops/sec ±10.21% (17 runs sampled)
levelup + medeadown batch(int, string) x 1000 x 38.26 ops/sec ±2.78% (17 runs sampled)

levelup + leveldown batch(int, string) x 100000 x 1.18 ops/sec ±10.11% (6 runs sampled)
levelup + medeadown batch(int, string) x 100000 x 0.31 ops/sec ±4.10% (5 runs sampled)

levelup + leveldown readStream (iterate whole db) x 10 x 560 ops/sec ±2.99% (21 runs sampled)
levelup + medeadown readStream (iterate whole db) x 10 x 538 ops/sec ±1.48% (20 runs sampled)

levelup + leveldown readStream (iterate whole db) x 1000 x 43.17 ops/sec ±2.59% (18 runs sampled)
levelup + medeadown readStream (iterate whole db) x 1000 x 30.60 ops/sec ±4.40% (18 runs sampled)

levelup + leveldown readStream (iterate whole db) x 100000 x 0.48 ops/sec ±2.29% (5 runs sampled)
levelup + medeadown readStream (iterate whole db) x 100000 x 0.31 ops/sec ±4.46% (5 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 10 x 635 ops/sec ±2.94% (10 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 10 x 639 ops/sec ±3.11% (19 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 1000 x 259 ops/sec ±3.80% (19 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 1000 x 178 ops/sec ±5.18% (20 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 100000 x 4.99 ops/sec ±5.58% (9 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 100000 x 2.44 ops/sec ±11.55% (7 runs sampled)
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

