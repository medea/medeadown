var test       = require('tape')
  , testCommon = require('abstract-leveldown/testCommon')
  , medeaDOWN    = require('./medeadown')
  , testBuffer = require('fs').readFileSync(__filename)

/*** compatibility with basic LevelDOWN API ***/

require('abstract-leveldown/abstract/leveldown-test').args(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/open-test').args(medeaDOWN, test, testCommon)
require('abstract-leveldown/abstract/open-test').open(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/del-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/get-test').all(medeaDOWN, test, testCommon)

// require('abstract-leveldown/abstract/put-test').all(medeaDOWN, test, testCommon)

// require('abstract-leveldown/abstract/put-get-del-test').all(medeaDOWN, test, testCommon, testBuffer)

// require('abstract-leveldown/abstract/batch-test').all(medeaDOWN, test, testCommon)
// require('abstract-leveldown/abstract/chained-batch-test').all(medeaDOWN, test, testCommon)

// require('abstract-leveldown/abstract/close-test').close(medeaDOWN, test, testCommon)

// require('abstract-leveldown/abstract/iterator-test').all(medeaDOWN, test, testCommon)

// require('abstract-leveldown/abstract/ranges-test').all(medeaDOWN, test, testCommon)
