### Dado

[![NPM VERSION](http://img.shields.io/npm/v/nprime.svg?style=flat)](https://www.npmjs.org/package/nprime)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/nprime)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/nprime.svg?style=flat)](https://codeclimate.com/github/rootslab/nprime)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/nprime.svg?style=flat)](https://codeclimate.com/github/rootslab/nprime)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/nprime#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/nprime.svg?style=flat)](http://travis-ci.org/rootslab/nprime)
[![BUILD STATUS](http://img.shields.io/david/rootslab/nprime.svg?style=flat)](https://david-dm.org/rootslab/nprime)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/nprime.svg?style=flat)](https://david-dm.org/rootslab/nprime#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/nprime.svg?style=flat)](http://npm-stat.com/charts.html?package=nprime)

[![NPM GRAPH1](https://nodei.co/npm-dl/nprime.png)](https://nodei.co/npm/nprime/)

[![NPM GRAPH2](https://nodei.co/npm/nprime.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nprime/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/nprime/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/nprime)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/nprime/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/nprime)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/nprime/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/nprime)

> __Dado__, a simple and dirty test runner.

###Install

```bash
$ npm install dado [-g]
```

> __require__:

```javascript
var Dado  = require( 'dado' );
```

###Run Tests

```bash
$ cd dado/
$ npm test
```

###Constructor

```javascript
Dado( [ Object opt ] )
// or
new Dado( [ Object opt ] )
```

####Options

> Default options are listed.

```javascript
opt = {
}
```

###Properties

```javascript
 /*
  * Instance configuration object.
  */
 Dado.options : Object
```

###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * Run tests from specified directory, default value for path is 'test' (or './test').
 * Optionally, if Dado default position is not in 'node_modules', you can specify the
 * relative path from 'dado/lib' directory to the root dir of the module to test
 * (default relative path is * '../../../').
 * The optional callback will be executed when all test files are executed, this function
 * gets 2 args/objs: queues for collected files and stats.
 *
 * NOTE:
 * - Only files ending with '-test.js' are loaded from the specified path/dir.
 * - Every loaded file should exports a 'test' property/method that gets 2 arguments,
 *   an object with some methods for assertions and a done function that you should call
 *   for properly exiting from the test.
 */
Dado#do : function ( String test_dir_path [, String module_relative_path [, Function callback ] ] ) : undefined

/*
 * Reset global queues and stats objects.
 */
Dado#reset : function () : Dado
```

### MIT License

> Copyright (c) 2015 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/dado/Readme?pixel)](https://github.com/igrigorik/ga-beacon)