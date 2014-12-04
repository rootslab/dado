/*
 * a dummy Dado test.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        ;

    log( '- execute 2 dummy assertions..' );
    assert.ok( true );
    assert.equal( 0, 0 );

    exit();
};