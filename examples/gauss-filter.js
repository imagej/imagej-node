config = {}
config.imagej_dir = process.env.IMAGEJ_DIR
config.java_dir = process.env.JAVA_HOME
config.headless = true

console.log('==> Starting ImageJ')
var imagej = require('../index.js')(config)

imagej.on('ready', function(ij) {
  source = 'https://imagej.net/images/clown.jpg'
  console.log('==> Loading image: ' + source)
  dataset = ij.io().open(source)
  console.log('==> Processing image')
  filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1])
  outPath = 'blurry-clown.png'
  console.log('==> Saving image: ' + outPath)
  ij.scifio().datasetIO().save(filtered, outPath)
  console.log('==> Goodbye!')
  ij.context().dispose()
})
