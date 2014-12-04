#!/usr/bin/env node
/*
 * Run Dado tests.
 */

var log = console.log
    , assert = require( 'assert' )
    , Dado = require( '../' )
    , dado = Dado( {} )
    ;

// let test fails if callbacks are not executed
setTimeout( function () {
    log( '- test callbacks are not executed! Exit from test' );
    process.exit( 1 );
}, 2000 );


log( '- test Dado with multiple files loaded from multiple directories.. ' );

dado.do( './test/dir1', '../', function ( collected, stats ) {

    // empty dir, it fails to load test  files

    dado.do( './test/dir2', '../', function ( collected, stats ) {

        // test is ok, no error

        dado.do( './test/dir3', '../', function ( collected, stats ) {

            // test error
            log( '- check collected test files.' );

            assert.equal( collected[ './test/dir1' ].length, 0 );
            assert.equal( collected[ './test/dir2' ][ 0 ], 'dado-ok-test.js' );
            assert.equal( collected[ './test/dir3' ][ 0 ], 'dado-err-test.js' );

            log( '- check stats for expected errors and load errors.' );

            assert.ok( stats[ './test/dir1' ].failed[ 'dado-load-err-empty-test.js' ] );
            assert.ok( stats[ './test/dir1' ].failed[ 'dado-load-err-test.js' ] );

            assert.equal( stats[ './test/dir1' ].assertions, 0 );
            assert.equal( stats[ './test/dir1' ].etot, 2 );

            assert.equal( stats[ './test/dir2' ].failed.length, 0 );
            assert.equal( stats[ './test/dir2' ].assertions, 2 );
            assert.equal( stats[ './test/dir2' ].etot, 0 );

            assert.ok( stats[ './test/dir3' ].failed[ 'dado-err-test.js' ] );
            assert.equal( stats[ './test/dir3' ].assertions, 1 );
            assert.equal( stats[ './test/dir3' ].etot, 1 );

            log( '- all Dado tests passed!\n' );

            process.exit( 0 );

        } );

    } );

} );