var leveldb = require('level-packager')(require('leveldown'))
  , medea = require('level-packager')(require('../medeadown'))
  , benchmarks = require('level-benchmarks')
  , engines = [
        {
            name: 'levelup + leveldown'
          , factory: leveldb
        }
      , {
            name: 'levelup + medeadown'
          , factory: medea
        }
    ]
  , lengths = [ 10, 1000, 100000 ]

benchmarks(
    engines
  , lengths
  , { maxTime: 1 }
  , function (err, result) {
      console.log(benchmarks.format(result))
    }
)