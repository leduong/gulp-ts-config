'use strict';

describe('gulp-ts-config', function() {
  var expect,
    should,
    plugin = require('../gulp-ts-config'),
    gulp = require('gulp'),
    path = require('path'),
    chai = require('chai'),
    spies = require('chai-spies'),
    File = require('vinyl'),
    es = require('event-stream'),
    through = require('through2'),
    fs = require('fs');

  before(function() {
    chai.use(spies);
    expect = chai.expect;
    should = chai.should;
  });

  describe('error handling', function() {
    it('should throw an error if a module name is missing', function() {
      expect(function() {
        plugin();
      }).to.throw(Error);
    });

    it('should only accept files in JSON format', function() {
      var mockFiles = [
        new File({
          path: 'mock/path.json',
          contents: es.readArray(['one', 'two'])
        }),
        new File({
          path: 'mock/path.json',
          contents: new Buffer('a string')
        }),
        new File({
          path: 'mock/path.json',
          contents: new Buffer(123)
        })
      ];
      mockFiles.forEach(function(file) {
        var stream = plugin('outputConfigurationName');
        stream.on('error', function(error) {
          expect(error.message).to.be.eql('invalid JSON file provided');
        });
        expect(function() {
          stream.write(file);
        }).not.to.throw();
      });
    });

    it('should emit an error on malformed JSON', function() {
      var file,
        stream;
      stream = plugin('asdf');
      stream.on('error', function(error) {
        expect(error.message).to.be.equal('invalid JSON file provided');
      });
      file = new File({
        path: 'mock/path.json',
        contents: new Buffer('{a:b}')
      });
      expect(function() {
        stream.write(file);
      }).to.not.throw();
    });
    it('should emit an error when supplying an invalid parser', function() {
      var file,
        stream;

      file = new File({
        path: 'mock/path.json',
        contents: new Buffer('{"foo": "bar"}')
      });

      stream = plugin('asdf', {
        parser: 'invalidParser'
      });
      stream.on('error', function(error) {
        expect(error.message).to.be.eql('invalidParser' + ' is not supported as a valid parser');
      });
      expect(function() {
        stream.write(file);
      }).not.to.throw();
    });
    it('should emit an error if the configuration exposes an invalid JSON object', function(done) {
      var file,
        stream;

      file = new File({
        path: 'mock/path.json',
        contents: new Buffer('1')
      });

      stream = plugin('asdf')
        .on('error', function(error) {
          expect(error.message).to.equal('configuration file contains invalid JSON');
          done();
        });

      expect(function() {
        stream.write(file);
      }).not.to.throw();
    });
  });

  describe('config generation', function() {
    describe('json', function() {
      it('should generate the template with scalar properties', function(done) {
        var expectedOutput = fs.readFileSync(path.normalize(__dirname + '/mocks/output_1.ts'));
        gulp.src(path.normalize(__dirname + '/mocks/input_1.json'))
          .pipe(plugin('gulpTsConfig'))
          .pipe(through.obj(function(file) {
            expect(file.contents.toString()).to.equal(expectedOutput.toString());
            done();
          }));
      });
    });
    describe('yml', function() {
      it('should generate the template with scalar properties', function(done) {
        var expectedOutput = fs.readFileSync(path.normalize(__dirname + '/mocks/output_2.ts'));
        gulp.src(path.normalize(__dirname + '/mocks/input_2.yml'))
          .pipe(plugin('gulpTsConfig', {
            parser: 'yml'
          }))
          .pipe(through.obj(function(file) {
            expect(file.contents.toString()).to.equal(expectedOutput.toString());
            done();
          }));
      });
    });
  });
});
