#gulp-ts-config

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/gulp-ts-config)
[![NPM version](http://img.shields.io/npm/v/gulp-ts-config.svg?style=flat)](https://npmjs.org/package/gulp-ts-config)
[![NPM version](http://img.shields.io/npm/dm/gulp-ts-config.svg?style=flat)](https://npmjs.org/package/gulp-ts-config)
[![Build Status](http://img.shields.io/travis/leduong/gulp-ts-config.svg?style=flat)](http://travis-ci.org/leduong/gulp-ts-config)
[![Coverage Status](https://coveralls.io/repos/leduong/gulp-ts-config/badge.svg?branch=develop&service=github)](https://coveralls.io/github/leduong/gulp-ts-config?branch=develop)
[![Code Climate](https://codeclimate.com/github/leduong/gulp-ts-config/badges/gpa.svg)](https://codeclimate.com/github/leduong/gulp-ts-config)
[![Dependency Status](http://img.shields.io/gemnasium/leduong/gulp-ts-config.svg?style=flat)](https://gemnasium.com/leduong/gulp-ts-config)

[![NPM](https://nodei.co/npm/gulp-ts-config.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-ts-config/)

It's often useful to generate a file of constants, usually as environment variables, for your Angular apps.
This Gulp plugin will allow you to provide an object of properties and will generate an Angular module of constants.

## To Install:
`npm install gulp-ts-config`

## How it works
It's pretty simple:
`gulpTsConfig(moduleName)`


## Example Usage
We start with our task. Our source file is a JSON file containing our configuration. We will pipe this through `gulpTsConfig` and out will come an angular module of constants.
```javascript
var gulp = require('gulp');
var gulpTsConfig = require('gulp-ts-config');

gulp.task('test', function () {
  gulp.src('appsettings.json')
  .pipe(gulpTsConfig('AppSettings'))
  .pipe(gulp.dest('.'))
});
```
Assume that `appsettings.json` contains:
```json
{
  "ApiEndpoint": "http://localhost:5000/api"
}
```
Running `gulp test` will take `appsettings.json` and produce `appsettings.ts` with the following content:

```ts
export class gulpTsConfig {

  public static get ApiEndpoint(): string {
    return "http://localhost:5000/api";
  }
}
```
We now can include this configuration module in our main app and access the constants
```ts
import { AppSettings } from 'appsettings';
```


## Configuration
Currently there are a few configurable options to control the output of your configuration file:
- [options.environment](#options.environment)
- [options.constants](#options.constants)
- [options.createModule](#options.createModule)
- [options.type](#options.type)
- [options.wrap](#options.wrap)
- [options.parser](#options.parser)
- [options.pretty](#options.pretty)


This is copy from [Atticus White](https://github.com/ajwhite/gulp-ng-config) @robinpowered

Thanks
Le Duong