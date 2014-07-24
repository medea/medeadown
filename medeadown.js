var fs = require('fs')

  , abstract = require('abstract-leveldown')
  , AbstractLevelDOWN = abstract.AbstractLevelDOWN
  , AbstractIterator = abstract.AbstractIterator
  , keydir = require('keydir')
  , ltgt = require('ltgt')
  , medea = require('medea')

  , MedeaDOWN = function (location) {
      if (!(this instanceof MedeaDOWN))
        return new MedeaDOWN(location)

      AbstractLevelDOWN.call(this, location)
      this.db = medea()
      this.keys = keydir()
    }
  , MedeaIterator = function (medea, options) {
      AbstractIterator.call(this, medea.db)
      this.options = options

      this.keys = medea.keys.range(options)
      this.idx = 0

      this.snapshot = medea.db.createSnapshot()
    }

require('util').inherits(MedeaDOWN, AbstractLevelDOWN)
require('util').inherits(MedeaIterator, AbstractIterator)

MedeaDOWN.prototype._open = function (options, callback) {
  var self = this
    , done = function (err) {
        if (err && err.code === 'ENOENT')
          err = new Error(self.location + ': No such file or directory')

        callback(err)
      }

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
        self.db.open(self.location, done)
    })
  } else {
    this.db.open(this.location, done)
  }
}

MedeaDOWN.prototype._close = function (callback) {
  this.db.close(callback)
}

MedeaDOWN.prototype._put = function (key, value, options, callback) {
  var self = this

  this.db.put(key, value, function (err) {
    if (err)
      return callback(err)

    self.keys.put(key)
    callback()
  })
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
  var self = this

  this.db.remove(key, function (err) {
    if (err)
      return callback(err)

    self.keys.del(key)
    callback()
  })
}

MedeaDOWN.prototype._batch = function (array, options, callback) {
  var self = this
    , batch = this.db.createBatch()


  array.map(function (operation) {
    if (operation.type === 'put')
      batch.put(operation.key, operation.value)
    else
      batch.remove(operation.key)
  })

  this.db.write(batch, function (err) {
    if (err)
      return callback(err)

    array.forEach(function (operation) {
      if (operation.type === 'put')
        self.keys.put(operation.key)
      else
        self.keys.del(operation.key)
    })

    callback()
  })
}

MedeaIterator.prototype._next = function (callback) {
  if (this.idx === this.keys.length)
    return setImmediate(callback)

  var self = this
    , key = this.keys[this.idx]

  this.idx++

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
  return new MedeaIterator(this, options)
}

module.exports = MedeaDOWN
