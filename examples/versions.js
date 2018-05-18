config = {}
config.imagej_dir = process.env.IMAGEJ_DIR
config.headless = true

var imagej = require('../index.js')(config)

imagej.on('ready', function(ij) {
  var java = require('java')
  System = java.import('java.lang.System')
  console.log('java home = ' + System.getProperty('java.home'))
  console.log('java version = ' + System.getProperty('java.version'))
  console.log('imagej version = ' + ij.app().getApp().getVersion())
  ij.context().dispose()
})
