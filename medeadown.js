var fs = require('fs')

  , abstract = require('abstract-leveldown')
  , AbstractLevelDOWN = abstract.AbstractLevelDOWN
  , AbstractIterator = abstract.AbstractIterator
  , ltgt = require('ltgt')
  , Medea = require('medea')

  , MedeaDOWN = function (location) {
      if (!(this instanceof MedeaDOWN))
        return new MedeaDOWN(location)

      AbstractLevelDOWN.call(this, location)
      this.db = new Medea()
    }
  , MedeaIterator = function (db, options) {
      AbstractIterator.call(this, db)
      this.options = options
      var keys = Object.keys(db.keydir)
        .filter(ltgt.filter(options))
        .sort()

      if (!options.reverse)
        keys = keys.reverse()

      if (options.limit && options.limit !== -1)
        keys = keys.slice( - options.limit)

      this.snapshot = keys.map(function (key) {
        return { key: key, entry: db.keydir[key] }
      })
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
    this.db.open(this.location, callback)
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

// Not really a batch - need support in Medea for this to work
MedeaDOWN.prototype._batch = function (array, options, callback) {
  var db = this.db

  require('run-parallel')(
      array.map(function (operation) {
        return function (done) {
          if (operation.type === 'put')
            db.put(operation.key, operation.value, done)
          else
            db.remove(operation.key, done)
        }
      })
    , callback
  )
}

// medea.get, but changed to use the entry from the snapshot instead of the
// latest one
MedeaIterator.prototype._next = function (callback) {
  if (this.snapshot.length === 0)
    return setImmediate(callback)

  var self = this
    , obj = this.snapshot.pop()
    , entry = obj.entry
    , key = obj.key
    , filename = this.db.dirname + '/' + entry.fileId + '.medea.data'
    , value = new Buffer(entry.valueSize)
    , fd

  this.db.readableFiles.forEach(function (df) {
    if (df.timestamp === entry.fileId)
      fd = df.fd
  })

  if (!fd) {
    cb(new Error('Invalid file ID.'));
    return;
  }

  fs.read(fd, value, 0, entry.valueSize, entry.valuePosition, function (err) {
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