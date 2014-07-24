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
levelup + leveldown put(int, string) x 10 x 586 ops/sec ±1.97% (21 runs sampled)
levelup + medeadown put(int, string) x 10 x 296 ops/sec ±87.05% (21 runs sampled)

levelup + leveldown put(int, string) x 1000 x 16.27 ops/sec ±72.33% (8 runs sampled)
levelup + medeadown put(int, string) x 1000 x 16.40 ops/sec ±51.51% (14 runs sampled)

levelup + leveldown put(int, string) x 100000 x 0.47 ops/sec ±3.17% (5 runs sampled)
levelup + medeadown put(int, string) x 100000 x 0.16 ops/sec ±24.59% (5 runs sampled)

levelup + leveldown get(int):string x 10 x 590 ops/sec ±1.31% (12 runs sampled)
levelup + medeadown get(int):string x 10 x 593 ops/sec ±1.84% (16 runs sampled)

levelup + leveldown get(int):string x 1000 x 56.93 ops/sec ±2.49% (18 runs sampled)
levelup + medeadown get(int):string x 1000 x 55.61 ops/sec ±3.96% (17 runs sampled)

levelup + leveldown get(int):string x 100000 x 0.52 ops/sec ±4.81% (5 runs sampled)
levelup + medeadown get(int):string x 100000 x 0.45 ops/sec ±4.00% (5 runs sampled)

levelup + leveldown batch(int, string) x 10 x 625 ops/sec ±2.75% (15 runs sampled)
levelup + medeadown batch(int, string) x 10 x 459 ops/sec ±2.38% (20 runs sampled)

levelup + leveldown batch(int, string) x 1000 x 112 ops/sec ±5.89% (19 runs sampled)
levelup + medeadown batch(int, string) x 1000 x 44.16 ops/sec ±4.49% (18 runs sampled)

levelup + leveldown batch(int, string) x 100000 x 1.29 ops/sec ±2.85% (6 runs sampled)
levelup + medeadown batch(int, string) x 100000 x 0.36 ops/sec ±5.04% (5 runs sampled)

levelup + leveldown readStream (iterate whole db) x 10 x 564 ops/sec ±1.27% (20 runs sampled)
levelup + medeadown readStream (iterate whole db) x 10 x 537 ops/sec ±1.74% (21 runs sampled)

levelup + leveldown readStream (iterate whole db) x 1000 x 49.30 ops/sec ±3.21% (19 runs sampled)
levelup + medeadown readStream (iterate whole db) x 1000 x 36.97 ops/sec ±2.39% (16 runs sampled)

levelup + leveldown readStream (iterate whole db) x 100000 x 0.57 ops/sec ±2.37% (5 runs sampled)
levelup + medeadown readStream (iterate whole db) x 100000 x 0.37 ops/sec ±1.40% (5 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 10 x 629 ops/sec ±1.20% (10 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 10 x 614 ops/sec ±16.52% (20 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 1000 x 265 ops/sec ±5.21% (17 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 1000 x 210 ops/sec ±0.95% (17 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 100000 x 4.89 ops/sec ±16.30% (10 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 100000 x 2.50 ops/sec ±18.09% (7 runs sampled)
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

