/*
 * an empty Dado test with syntax error to throw load error
 */
exports.test  = function ( done, assertions ) {
    var log = console.log
        , exit = typeof done === 'function' ? done : function () {}
        , assert = assertions || require( 'assert' )
        ;
    log( '- a dummy test..' );
    log( assert );
    log( '- exit from test' );
    exit();
};