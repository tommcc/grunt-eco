/*
 * grunt-eco
 * https://github.com/gr2m/grunt-eco
 *
 * Copyright (c) 2012 Gregor Martynus
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  var path = require('path');
  

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('eco', 'Compile Embedded CoffeeScript Templates', function() {
    this.requiresConfig('eco');

    var helpers = require('grunt-lib-contrib').init(grunt);


    var basePath;
    var srcFiles;
    var newFileDest;

    this.files.forEach(function (file) {
      file.dest = path.normalize(file.dest);
      srcFiles = grunt.file.expand(file.src);

      basePath = helpers.findBasePath(srcFiles, file.basePath);

      console.log("basePath")
      console.log(basePath)

      srcFiles.forEach(function (srcFile) {
        newFileDest = helpers.buildIndividualDest(file.dest, srcFile, basePath);
        compile(srcFile, newFileDest, basePath);
      })
    })
  })

  var compile = function(src, destPath, basePath) {
    var eco = require('eco'),
        js = '';


    options = grunt.config('eco.app');
    extension = typeof extension === "undefined" ? '.js' : extension;

    var dirname = path.dirname(src);
    var basename = path.basename(src, '.eco'),
        dest = destPath + extension;
    var JSTpath

    // De-dup dest if we have .js.js - see issue #16
    if (dest.match(/\.js\.js/)) {
      dest = dest.replace(/\.js\.js/, ".js");
    }

    if (path.extname(src) === '.js') {
      grunt.file.copy(src, dest);
      return true;
    }

    if( options.bare !== false ) {
      options.bare = true;
    }

    try {
      js = eco.compile(basename, grunt.file.read(src), options);

      JSTpath = dirname + '/' + basename
      JSTpath = JSTpath.replace(basePath, '').substr(1)
      JSTpath = JSTpath.replace(/views\//, '')

      console.log('compiling %s', JSTpath)

      js = js.replace(/module\.exports/, "if (! window.JST) { window.JST = {}}; window.JST['"+JSTpath+"']")

      grunt.file.write(dest, js);
      return true;
    } catch (e) {
      grunt.log.error("Error in " + src + ":\n" + e);
      return false;
    }
  };


}