var fs = require('fs')

  , abstract = require('abstract-leveldown')
  , AbstractLevelDOWN = abstract.AbstractLevelDOWN
  , AbstractIterator = abstract.AbstractIterator
  , ltgt = require('ltgt')
  , medea = require('medea')

  , MedeaDOWN = function (location) {
      if (!(this instanceof MedeaDOWN))
        return new MedeaDOWN(location)

      AbstractLevelDOWN.call(this, location)
      this.db = medea()
    }
  , MedeaIterator = function (db, options) {
      AbstractIterator.call(this, db)
      this.options = options
      this.keys = Object.keys(db.keydir)
        .filter(ltgt.filter(options))
        .sort()

      if (!options.reverse)
        this.keys = this.keys.reverse()

      if (options.limit && options.limit !== -1)
        this.keys = this.keys.slice( - options.limit)

      this.snapshot = db.createSnapshot()
    }

require('util').inherits(MedeaDOWN, AbstractLevelDOWN)
require('util').inherits(MedeaIterator, AbstractIterator)

MedeaDOWN.prototype._open = function (options, callback) {
  var self = this

  if (options.createIfMissing === false || options.errorIfExists) {
    fs.exists(this.location, function (exists) {
      if (!exists && options.createIfMissing === false)
        callback(
          new Error(self.location + ' does not exist (createIfMissing is false)')
        )
      else if (exists && options.errorIfExists)
        callback(
          new Error(self.location + ' exists (errorIfExists is true)')
        )
      else
        self.db.open(self.location, callback)
    })
  } else {
    this.db.open(this.location, function (err) {
      if (err && err.code === 'ENOENT')
        err = new Error(self.location + ': No such file or directory')

      callback(err)
    })
  }
}

MedeaDOWN.prototype._close = function (callback) {
  this.db.close(callback)
}

MedeaDOWN.prototype._put = function (key, value, options, callback) {
  this.db.put(key, value, callback)
}

MedeaDOWN.prototype._get = function (key, options, callback) {
  var asBuffer = options.asBuffer !== false

  this.db.get(key, function (err, value) {
    if (!err && value === undefined)
      err = new Error('NotFound:')

    if (value && !asBuffer)
      value = value.toString()

    callback(err, value)
  })
}

MedeaDOWN.prototype._del = function (key, options, callback) {
  this.db.remove(key, callback)
}

MedeaDOWN.prototype._batch = function (array, options, callback) {
  var db = this.db
    , batch = db.createBatch()


  array.map(function (operation) {
    if (operation.type === 'put')
      batch.put(operation.key, operation.value)
    else
      batch.remove(operation.key)
  })

  db.write(batch, callback)
}

MedeaIterator.prototype._next = function (callback) {
  if (this.keys.length === 0)
    return setImmediate(callback)

  var self = this
    , key = this.keys.pop()

  this.db.get(key, this.snapshot, function (err, value) {
    if (err)
      return callback(err)

    if (self.options.keyAsBuffer !== false)
      key = new Buffer(key)

    if (self.options.valueAsBuffer === false)
      value = value.toString()

    callback(null, key, value)
  })
}

MedeaIterator.prototype._end = function (callback) {
  this.keys = undefined
  callback()
}

MedeaDOWN.prototype._iterator = function (options) {
  return new MedeaIterator(this.db, options)
}

module.exports = MedeaDOWN
