"use strict";

var SimpleStorage = function( storageLib, _ ){

  // Private Implementation

  // here a weakmap should be useful... i think
  var _currentNamespace = storageLib(),
    _spaces = {},
    storage = {};

  function _create( namespace ){
    if ( (typeof namespace != "string") || (namespace.trim().length === 0) || (namespace.trim() === " ") ){
      namespace = "default";
    }

    _spaces[ namespace ] = storageLib.namespace( namespace );
    _currentNamespace = _spaces[ namespace ];
    return storage;
  }

  function _put(key, val){
    if ( !key ){ throw "Error: a _key_ is missing."; }

    return _currentNamespace.set( key, val );
  }

  function _fetch( key ){
    if ( !key ){ throw "Error: a key is missing."; }

    return _currentNamespace.get( key );
  }

  function _find( filterValFn ){
    var result;
    _currentNamespace.each( function(key, val){
      if ( filterValFn.call(val) ){
        result = _fetch( key );
        // stop searching
        return false;
      }
    });
    return result;
  }

  function _filter( filterValFn ){
    var result = [];
    _currentNamespace.each( function(key, val){
      if ( filterValFn.call(val) ){
        result.push( val );
      }
    } );
    return result;
  }

  function _each( eachFn ){
    _currentNamespace.each( eachFn );
  }

  function _forward( fnName, argsArray ){
    argsArray = argsArray || [];

    var result;

    try{
      result = ( _currentNamespace[ fnName ] ).apply( _currentNamespace, argsArray );
    }catch( e ){
      console.error( 'An error ocurred when calling: ' + fnName + ' | Dump: ' + e );
    }

    return result;
  }


  // Public API

  storage.create = function( namespace ){
    return _create( namespace );
  };

  storage.put = function( key, val ){
    var back;
    back = _put( key, val);
    if ( typeof back != "undefined" ){
      return back;
    }
  };

  storage.fetch = function( key ){
    return _fetch( key );
  };

  /**
   * [publicFind Returns first value that matchs the given criteria ]
   * @param  {Function} filterValFn a truthy (boolean) function comparing some saved obj property.
   * @return {Object or undefined}           A result object or undefined.
   */
  storage.find = function( filterValFn ){
    return _find( filterValFn );
  };

  /**
   * [publicFilter Returns every value matching a given criteria]
   * @param  {Function} filterValFn a truthy (boolean) function comparing some saved obj property.
   * @return {Array}           Results data.
   */
  storage.filter = function( filterValFn ){
    return _filter( filterValFn );
  };

  storage.each = function( eachFn ){
    _each( eachFn );
  };

  storage.forward = function( fnName, argsArray ){
    return _forward( fnName, argsArray );
  };

  return storage;
  // return {
  //   create: publicCreate,
  //   put: publicPut,
  //   fetch: publicFetch,
  //   find: publicFind,
  //   filter: publicFilter,
  //   each: publicEach
  // };

}( store, _ );