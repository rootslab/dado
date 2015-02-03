### Dado

[![NPM VERSION](http://img.shields.io/npm/v/dado.svg?style=flat)](https://www.npmjs.org/package/dado)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/dado)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/dado.svg?style=flat)](https://codeclimate.com/github/rootslab/dado)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/dado.svg?style=flat)](https://codeclimate.com/github/rootslab/dado)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/dado#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/dado.svg?style=flat)](http://travis-ci.org/rootslab/dado)
[![BUILD STATUS](http://img.shields.io/david/rootslab/dado.svg?style=flat)](https://david-dm.org/rootslab/dado)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/dado.svg?style=flat)](https://david-dm.org/rootslab/dado#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/dado.svg?style=flat)](http://npm-stat.com/charts.html?package=dado)

[![NPM GRAPH1](https://nodei.co/npm-dl/dado.png)](https://nodei.co/npm/dado/)

[![NPM GRAPH2](https://nodei.co/npm/dado.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dado/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/dado/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/dado)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/dado/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/dado)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/dado/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/dado)

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