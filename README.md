# Node.js module for ImageJ

Do you want to embed [ImageJ](https://imagej.net/) in your node.js application?
Well then, today is your lucky day!

## Installation

```
npm install imagej
```

## Usage

```javascript
config = {}
config.imagej_dir = '/path/to/Fiji.app'
config.headless = true // Unless you want the GUI.
console.log('==> Starting ImageJ')
var imagej = require('imagej')(config)
imagej.on('ready', function(ij) {
  ij.log().info('==> ImageJ is ready to go.')
  dataset = ij.io().open('/path/to/myImage.tif')
  filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1])
  ij.scifio().datasetIO().save(filtered, outPath)
  ij.context().dispose()
})
```

## Examples

See the `examples` folder.

They assume you've set the `IMAGEJ_DIR` environment variable to an [ImageJ2]
installation(https://imagej.net/ImageJ2). The easiest way to get ImageJ2 is to
install [Fiji](https://fiji.sc/).

Optionally, you can also set `JAVA_HOME` if you want to override which version
of Java is used.

## Troubleshooting

__If the ImageJ startup hangs on macOS__, you may have been bit by the dreaded
AWT main thread issue. Try setting `config.headless = true` in the `config`
object you pass to the imagej initialization function.

For further details, see
[this article](http://mirror.informatimago.com/next/developer.apple.com/technotes/tn2005/tn2147.html#TNTAG40)
as well as
[joeferner/node-java#21](https://github.com/joeferner/node-java/issues/21).

__If `npm install` fails on macOS__, you may have an issue with Python
configuration. The `java` module used by `imagej` requires native compilation
via `node-gyp`, which uses Python 2 (not 3!) internally. Try this:
```
npm config set python /usr/bin/python
export PATH=/usr/bin:$PATH
```
And then `npm install` again.
