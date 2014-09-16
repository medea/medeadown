var fs = require('fs')

  , AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
  , keydir = require('keydir')
  , medea = require('medea')
  , medeaCompressed = require('medea-compressed')
  , open = require('leveldown-open')

  , MedeaIterator = require('./medeaiterator')

  , MedeaDOWN = function (location) {
      if (!(this instanceof MedeaDOWN))
        return new MedeaDOWN(location)

      AbstractLevelDOWN.call(this, location)
    }
  , fixValue = function (value) {
      return Buffer.isBuffer(value) ? value : String(value)
    }

  , setImmediate = global.setImmediate || process.nextTick

require('util').inherits(MedeaDOWN, AbstractLevelDOWN)

MedeaDOWN.prototype._open = function (options, callback) {
  var self = this
    , compression = !(options.compression === false)
    , medeaDb = medea()

  this.db = compression ? medeaCompressed(medeaDb) : medeaDb
  this.keys = keydir()

  open(this.location, options, function (err) {
    if (err)
      return callback(err)

    self.db.open(self.location, function (err) {
      if (err)
        return callback(err)

      Object.keys(medeaDb.keydir).forEach(function (key) {
        self.keys.put(key)
      })

      callback()
    })
  })
}

MedeaDOWN.prototype._close = function (callback) {
  this.db.close(callback)
}

MedeaDOWN.prototype._put = function (key, value, options, callback) {
  var self = this

  this.db.put(key, fixValue(value), function (err) {
    if (err)
      return callback(err)

    self.keys.put(key)
    callback()
  })
}

MedeaDOWN.prototype._del = function (key, options, callback) {
  var self = this

  if (!this.keys.has(key))
    return setImmediate(callback)

  this.db.remove(key, function (err) {
    if (err)
      return callback(err)

    self.keys.del(key)
    callback()
  })
}

MedeaDOWN.prototype._createBatch = function (array) {
  var self = this
    , batch = this.db.createBatch()

  array.forEach(function (operation, idx) {

      for(var idx2 = idx + 1; idx2 < array.length; ++idx2)
        if (array[idx2].key === operation.key)
          return

       if (operation.type === 'put')
        batch.put(operation.key, fixValue(operation.value))
      else if (self.keys.has(operation.key))
        batch.remove(operation.key)
    })

  return batch
}

MedeaDOWN.prototype._batch = function (array, options, callback) {
  if (array.length === 0)
    return setImmediate(callback)

  var self = this
    , batch = this._createBatch(array)

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
