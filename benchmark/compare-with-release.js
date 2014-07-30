var release = require('level-packager')(require('medeadown'))
  , master = require('level-packager')(require('../medeadown'))
  , benchmarks = require('level-benchmarks')
  , engines = [
        {
            name: 'medeadown master'
          , factory: master
        }
      , {
            name: 'medeadown release ' + require('medeadown/package.json').version
          , factory: release
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