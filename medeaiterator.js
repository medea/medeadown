var AbstractIterator = require('abstract-leveldown').AbstractIterator

  , MedeaIterator = function (medea, options) {
      AbstractIterator.call(this, medea.db)

      this.keyAsBuffer = options.keyAsBuffer !== false
      this.valueAsBuffer = options.valueAsBuffer !== false

      this.keys = medea.keys.range(options)
      this.idx = 0

      this.snapshot = medea.db.createSnapshot()
    }

  , setImmediate = global.setImmediate || process.nextTick

require('util').inherits(MedeaIterator, AbstractIterator)

MedeaIterator.prototype._next = function (callback) {
  if (this.idx === this.keys.length)
    return setImmediate(callback)

  var self = this
    , key = this.keys[this.idx]

  this.idx++

  this.db.get(key, this.snapshot, function (err, value) {
    if (!err && value === undefined)
      return self._next(callback)

    if (err)
      return callback(err)

    if (!self.keyAsBuffer)
      key = key.toString()

    if (!self.valueAsBuffer)
      value = value.toString()

    callback(null, key, value)
  })
}

MedeaIterator.prototype._end = function (callback) {
  this.keys = undefined
  this.snapshot.close()
  callback()
}

module.exports = MedeaIterator
