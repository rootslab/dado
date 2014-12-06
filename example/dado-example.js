var log = console.log
    , Dado = require( '../' )
    , dado = Dado( {} )
    ;

log( '\n- run test from example dir:' );

dado.do( 'example', '../' );