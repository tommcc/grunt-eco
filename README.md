# grunt-eco

JavaScripts your Embedded CoffeeScript Templates

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-eco`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-eco');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
You'll need to install `grunt-eco` first:

    npm install grunt-eco

Then modify your `grunt.js` file by adding the following line:

    grunt.loadNpmTasks('grunt-eco');

Then add some configuration for the plugin like so:

    grunt.initConfig({
        ...
        eco: {
          app: {
            src: ['path/to/eco/files/*.eco'],
            dest: 'where/you/want/your/js/files'
          }
        },
        ...
    });

Then just run `grunt eco` and enjoy!

If you have `dest` path and want to preserve the directory structure of your eco files, pass the `preserve_dirs` option.

    options: {
        preserve_dirs: true
    }

Also, if you just want to preserve the directory structure, starting from a base path, pass the `base_path` option.

    options: {
        preserve_dirs: true,
        base_path: 'path/to'
    }

This will create the files under `where/you/want/your/js/files/eco/files/`.

## Acknowledgment
This grunt plugin is based on and heavily inspired by [grunt-coffee](https://github.com/avalade/grunt-coffee). Thanks @avalade

## Todo

* add specs

## License
Copyright (c) 2012 Gregor Martynus
Licensed under the MIT license.
