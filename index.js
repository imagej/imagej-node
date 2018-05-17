var fs = require('fs')
var path = require('path')
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter
var mvn = require('node-java-maven'); // NB: Only for asynchronous loading.

module.exports = ImageJ
inherits(ImageJ, EventEmitter)

function addToClasspath (java, dir) {
  files = fs.readdirSync(dir)
  files.forEach(function (file) {
    fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) addToClasspath(java, fullPath)
    if (fullPath.endsWith('.jar')) java.classpath.push(fullPath)
  })
}

function ImageJ (config) {
  if (!(this instanceof ImageJ)) return new ImageJ(config)
  var self = this
  mvn(function(err, mvnResults) {
    var java = require('java')

    addToClasspath(java, config.imagej_dir)

    java.asyncOptions = {
      asyncSuffix: "Later",
      syncSuffix: "",
      promiseSuffix: "Promise",
      promisify: require("when/node").lift
    }
    self.emit('booting')

    if (config.headless) {
      var System = java.import('java.lang.System')
      System.setProperty('java.awt.headless', 'true')
    }
    var ImageJ = java.import('net.imagej.ImageJ')
    ij = ImageJ()

    self.emit('ready', ij)
  })
}
