var test       = require('tape')
  , testCommon = require('abstract-leveldown/testCommon')
  , medeaDOWN  = require('./medeadown')
  , testBuffer = require('fs').readFileSync(__filename)
  , db

/*** compatibility with basic LevelDOWN API ***/

require('abstract-leveldown/abstract/leveldown-test').args(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/open-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/del-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/get-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/put-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/put-get-del-test').all(medeaDOWN, test, testCommon, testBuffer)

require('abstract-leveldown/abstract/batch-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/chained-batch-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/close-test').close(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/iterator-test').all(medeaDOWN, test, testCommon)

require('abstract-leveldown/abstract/ranges-test').all(medeaDOWN, test, testCommon)

test('setUp common', testCommon.setUp)
test('setUp db', function (t) {
  db = medeaDOWN(testCommon.location())
  db.open(t.end.bind(t))
})


test('iterator#end() do cleanup', function (t) {
  var iterator = db.iterator()

  iterator.end(function (err) {
    t.error(err)
    t.ok(iterator.snapshot.closed)
    t.notOk(iterator.keys)
    t.end()
  })
})

test('iterator on previously closed db', function (t) {
  var location = db.location

  db.put('beep', 'boop', function () {
    db.close(function () {
      db = medeaDOWN(location)
      db.open(function () {
        var iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false })

        iterator.next(function (err, key, value) {
          t.equal(key.toString(), 'beep')
          t.equal(value.toString(), 'boop')
          iterator.end(t.end.bind(t))
        })

      })
    })
  })
})

test('iterator on previously closed db with deleted key', function (t) {
  var location = db.location

  db.put('beep', 'boop', function () {
    db.del('beep', function() {
      db.close(function () {
        db = medeaDOWN(location)
        db.open(function () {
          var iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false })

          iterator.next(function (err, key, value) {
            t.notOk(err)
            t.notOk(key)
            t.notOk(value)
            iterator.end(t.end.bind(t))
          })

        })
      })
    })
  })
})

test('tearDown', function (t) {
  db.close(testCommon.tearDown.bind(null, t))
})
