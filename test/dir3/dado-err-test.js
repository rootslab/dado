/*
 * an empty Dado test
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        ;

    // dummy assertions
    log( '- execute a dummy assertion..' );
    assert.ok( true );

    log( '- then let the test fail..' );
    assert.ok( false );

    // exit test
    exit();
};