A jQuery plugin for grey-scaling images on the fly. Works with cross-origin requests
thanks to [@maxnovakovic](http://www.twitter.com/maxnovakovic)'s [$.getImageData](http://www.maxnov.com/getimagedata/).

Images are wrapped with a container a grey-scale version of that image in a `<canvas>` is inserted into that wrapper.
Attach your own events using `$().on()` to use this new grey-scaled version of the image.

See `example.html` for a usage.

Tested in IE9, Safari, Chrome and FireFox. If you want support for IE6-8 use Microsoft's propriety filter CSS property.

Please send bug reports and feature requests to [andrew@pryde-design.co.uk](mailto:andrew@pryde-design.co.uk) or submit
them as [issues on GitHub](https://github.com/Prydie/jQuery-GreyScale-Plugin/issues).