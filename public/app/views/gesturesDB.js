'use strict';
var GesturesDB = function( Lawnchair ){

  var localDB = {};

  function _createDB( options ){
    return localDB = new Lawnchair( options, function( db ){
      
    });
  };




  // Public API

  function publicCreateDB( options ){
    _createDB( options );
  };

  return {
    create: publicCreateDB
  };

}( Lawnchair );