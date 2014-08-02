var fs = require('fs')

  , AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
  , keydir = require('keydir')
  , medea = require('medea')

  , MedeaIterator = require('./medeaiterator')

  , MedeaDOWN = function (location) {
      if (!(this instanceof MedeaDOWN))
        return new MedeaDOWN(location)

      AbstractLevelDOWN.call(this, location)
      this.db = medea()
      this.keys = keydir()
    }

  , setImmediate = global.setImmediate || process.nextTick

require('util').inherits(MedeaDOWN, AbstractLevelDOWN)

MedeaDOWN.prototype._open = function (options, callback) {
  var self = this
    , done = function (err) {
        if (err && err.code === 'ENOENT')
          err = new Error(self.location + ': No such file or directory')

        if (err)
          return callback(err)

        Object.keys(self.db.keydir).forEach(function (key) {
          self.keys.put(key)
        })

        callback()
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
  if (array.length === 0)
    return setImmediate(callback)

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

MedeaDOWN.prototype._iterator = function (options) {
  return new MedeaIterator(this, options)
}

module.exports = MedeaDOWN
