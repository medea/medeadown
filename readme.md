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
levelup + leveldown put(int, string) x 10 x 576 ops/sec ±1.69% (16 runs sampled)
levelup + medeadown put(int, string) x 10 x 513 ops/sec ±1.04% (21 runs sampled)

levelup + leveldown put(int, string) x 1000 x 56.26 ops/sec ±4.76% (18 runs sampled)
levelup + medeadown put(int, string) x 1000 x 17.79 ops/sec ±22.66% (14 runs sampled)

levelup + leveldown put(int, string) x 100000 x 0.44 ops/sec ±6.51% (5 runs sampled)
levelup + medeadown put(int, string) x 100000 x 0.15 ops/sec ±38.40% (5 runs sampled)

levelup + leveldown get(int):string x 10 x 614 ops/sec ±7.73% (13 runs sampled)
levelup + medeadown get(int):string x 10 x 581 ops/sec ±8.03% (16 runs sampled)

levelup + leveldown get(int):string x 1000 x 61.88 ops/sec ±4.17% (19 runs sampled)
levelup + medeadown get(int):string x 1000 x 58.46 ops/sec ±6.31% (18 runs sampled)

levelup + leveldown get(int):string x 100000 x 0.57 ops/sec ±2.19% (5 runs sampled)
levelup + medeadown get(int):string x 100000 x 0.50 ops/sec ±4.65% (5 runs sampled)

levelup + leveldown batch(int, string) x 10 x 634 ops/sec ±1.74% (14 runs sampled)
levelup + medeadown batch(int, string) x 10 x 432 ops/sec ±1.79% (21 runs sampled)

levelup + leveldown batch(int, string) x 1000 x 120 ops/sec ±5.71% (19 runs sampled)
levelup + medeadown batch(int, string) x 1000 x 43.22 ops/sec ±2.99% (18 runs sampled)

levelup + leveldown batch(int, string) x 100000 x 1.35 ops/sec ±7.73% (6 runs sampled)
levelup + medeadown batch(int, string) x 100000 x 0.35 ops/sec ±7.20% (5 runs sampled)

levelup + leveldown readStream (iterate whole db) x 10 x 542 ops/sec ±1.21% (19 runs sampled)
levelup + medeadown readStream (iterate whole db) x 10 x 506 ops/sec ±1.97% (21 runs sampled)

levelup + leveldown readStream (iterate whole db) x 1000 x 51.61 ops/sec ±2.36% (20 runs sampled)
levelup + medeadown readStream (iterate whole db) x 1000 x 34.23 ops/sec ±4.28% (20 runs sampled)

levelup + leveldown readStream (iterate whole db) x 100000 x 0.60 ops/sec ±6.57% (5 runs sampled)
levelup + medeadown readStream (iterate whole db) x 100000 x 0.36 ops/sec ±4.24% (5 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 10 x 621 ops/sec ±1.43% (10 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 10 x 578 ops/sec ±1.15% (15 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 1000 x 290 ops/sec ±1.18% (15 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 1000 x 201 ops/sec ±1.34% (17 runs sampled)

levelup + leveldown readStream (iterate 10% of db) x 100000 x 6.01 ops/sec ±1.63% (10 runs sampled)
levelup + medeadown readStream (iterate 10% of db) x 100000 x 2.78 ops/sec ±11.57% (7 runs sampled)
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

