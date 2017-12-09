/*
 * Dado, a simple and dirty test runner.
 *
 * Copyright(c) 2015-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Dado = ( function () {
    var log = console.log
        , assert = require( 'assert' )
        , fs = require( 'fs' )
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , clone = Bolgia.clone
        , improve = Bolgia.improve
        , iopt = {
            showHidden : false
            , depth : 10
            , colors : true
            , customInspect : true
        }
        , inspect = function ( el ) {
            return util.inspect( el, iopt );
        }
        // output errors
        , printAssertionError = function ( e ) {
            log();
            log( ' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' );
            log( ' !!!!!!!!! ASSERTION ERROR !!!!!!!!! ' );
            log( ' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' );
            log( '\n > name: %s', inspect( e.name ) );
            log( '\n > operator: %s', inspect( e.operator ) );
            log( '\n > message: %s ', e.message );
            log( '\n > actual: %s', inspect( e.actual ) );
            log( '\n > expected: %s', inspect( e.expected ) );
            log( '\n > stack: %s\n', inspect( e.stack.split( '\n    at' ).slice( 1 ) ) );
            log( ' ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n ' );
        }
        , printLoadError = function ( pname, fname, e ) {
            log();
            log( ' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' );
            log( ' !!!! TEST FILE LOAD ERROR !!!!' );
            log( ' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n' );
            log( ' message: %s\n\n stack: %s', inspect( e.message ), inspect( e.stack.split( '\n' ) ) );
            log( '\n ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n' );
        }
        , pushError = function ( pname, fname, err ) {
            // check if path name already exists in counters
            if ( ! stats[ pname ] ) stats[ pname ] = {  failed : {}, assertions : 0, etot : 0 };
            var failed = stats[ pname ].failed
                ;
            if ( ! failed[ fname ] ) failed[ fname ] = { number : collected[ pname ].indexOf( fname ) + 2 >>> 1, errors : [] };

            err.timestamp = Date.now();
            err.test_num = failed[ fname ].number;
            err.test_file = fname;
            failed[ fname ].errors.push( err );
            ++stats[ pname ].etot;
        }
        , printError = function( pname, fname, e ) {
            pushError( pname, fname, e );
            printAssertionError( e );
        }
        , assertions = function ( path_name, test_name ) {
            // check if path name already exists in counters
            if ( ! stats[ path_name ] ) stats[ path_name ] = { failed : [], assertions : 0, etot : 0 };
            return {
                deepEqual : function () {
                    try { 
                        assert.deepEqual.apply( null, arguments );
                        ++stats[ path_name ].assertions;
                    } catch ( e ) {
                       printError( path_name, test_name, e );
                    }
                }
                , ok : function () {
                    try { 
                        assert.ok.apply( null, arguments );
                        ++stats[ path_name ].assertions;
                    } catch ( e ) {
                       printError( path_name, test_name, e );
                    }
                }
                , equal : function () {
                    try { 
                        assert.equal.apply( null, arguments );
                        ++stats[ path_name ].assertions;
                    } catch ( e ) {
                        printError( path_name, test_name, e );
                    }
                }
                , strictEqual : function () {
                    try { 
                        assert.strictEqual.apply( null, arguments );
                        ++stats[ path_name ].assertions;
                    } catch ( e ) {
                        printError( path_name, test_name, e );
                    }
                }
                , throws : assert.throws
            };
        }
        // collect test files
        , collected = {}
        // collect test stats
        , stats = {}
        // dado default opt
        , dado_opt = {
        }
        , Dado = function ( opt ) {
            var me = this
                , is = me instanceof Dado
                ;
            if ( ! is ) return new Dado( opt );

            var cfg = improve( clone( opt ), dado_opt )
                ;
        }
        , dproto = Dado.prototype
        ;


    // catch SIGINT
    process.on( 'SIGINT', function () {
        log( '\n (SIGINT) Stopping Tests...\n' );
        process.exit( 0 );
    } );

    dproto.reset = function () {
        var me = this
            ;
        collected = {};
        stats = {};
        return me;
    };

    dproto.do = function ( test_path, module_rpath, callback ) {
        var me = this
            , cback = typeof callback === 'function' ? callback : function () {}
            // path
            , tpath = typeof test_path === 'string' ? test_path : './test'
            // relative path for module to test ( starting from dado/lib )
            , mpath = typeof module_rpath === 'string' ? module_rpath : '../../../'
            // test files queue
            , fqueue = []
            ;

        // check if a queue already exists
        if ( collected[ test_path ] ) return;
        // add a new file queue for this dir/path
        collected[ tpath ] = fqueue;
        // read directory from path string
        fs.readdir( tpath, function ( err, files ) {

            if ( err ) throw err;
            var minfo = require( mpath + 'package.json' )
                , mname = minfo.name.charAt( 0 ).toUpperCase() + minfo.name.slice( 1 )
                , mver = minfo.version
                , t = null
                , flen = files.length
                , fname = files[ 0 ]
                , f = 0
                , fails = 0
                , success = 0
                , loaded = 0
                , finished = 0
                , qpos = 0
                , stime = -1
                , etime = -1
                , tot = 0
                , done = function ( wait ) {
                    var k = null
                        , emsg = stats[ tpath ].etot === 1  ?
                                 '  %s error was encountered executing: %s.\n' :
                                 '  %s errors were encountered executing: \n  %s.\n'
                        , errored = []
                        , failed = stats[ tpath ].failed
                        ;
                    if ( ++finished < success ) return setTimeout( next, wait || 500 );
                    etime = Date.now();
                    log( '\n- current path is %s.', inspect( tpath ) );
                    log( '- time elapsed: %s secs.', inspect( + ( ( etime - stime ) / 1000 ).toFixed( 3 ) ) );
                    log( '\n  %s test %s loaded.', inspect( loaded ), loaded > 1 ? 'files were' : 'file was' );
                    if ( fails ) log( '  %s test %s not executed.', inspect( fails ), fails > 1 ? 'files were' : 'file was' );
                    log( '  %s test %s launched.', inspect( success ), success > 1 ? 'files were' : 'file was' );
                    log( '  %s assertions succeeded.\n', inspect( stats[ tpath ].assertions ) );
                    if ( stats[ tpath ].etot ) {
                        for ( k in failed ) errored.push( failed[ k ].number, k );
                        log( emsg, inspect( stats[ tpath ].etot ), inspect( errored ) );
                    }
                    cback( collected, stats );
                }
                , next = function () {
                    if ( ! tot ) {
                        log( '- skipping empty dir: %s', inspect( tpath ) );
                        // execute callback
                        return done();
                    }
                    var t = qpos + 2 >>> 1
                        , tname = null
                        , tfn = null
                        ;
                    if ( qpos < fqueue.length ) {
                        tname = fqueue[ qpos++ ];
                        tfn = fqueue[ qpos++ ];
                        log( '\n[%s/%s][ %s v%s - %s ]\n', inspect( t ), inspect( tot ), mname, mver, inspect( tpath + '/' + tname ) );
                        // run script
                        tfn( done, assertions( tpath, tname ) );
                    }
                }
                ;

            // load file list
            for ( ; f < flen; fname = files[ ++f ] ) {
                // load only test files
                if ( ~ fname.indexOf( '-test.js' ) ) {
                    ++loaded;
                    try { 
                        // load test file
                        t = require( mpath + tpath + '/' + fname ).test;
                        if ( ! t ) throw new Error( 'no test code found in ' + fname );
                        fqueue.push( fname, t );
                        ++success;
                    } catch ( e ) {
                        stime = Date.now();
                        ++fails;
                        pushError( tpath, fname, e );
                        printLoadError( tpath, fname, e );
                    }
                }
            }

            // start tests
            tot = fqueue.length >>> 1;
            stime = Date.now();
            next();

        } );

        return me;
    };

    return Dado;

} )();