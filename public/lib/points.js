/**
 * points.js
 *
 * This module is based on "points": https://github.com/philnash/leap-motion-experiments
 *
 * All credit from this great and simple module goes to https://github.com/philnash.
 * Go and check it all his awesome stuff.
 *
 */
'use strict';
var Points = function(){

  /**
   * Implementation details below
   */
  var radius = 6,
    canvas, ctx;

  function _init( options ){
    options = (typeof options === 'object') ? options : {};

    // get the canvas, 2d context, paragraph for data and set the radius
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');

    //canvas.width = document.body.clientWidth;
    if ( options.width ){
      canvas.width = options.width;
    }else{
      canvas.width = ( Math.max(window.innerWidth, document.body.clientWidth) ) / 1.7;
    }
    //canvas.height = document.body.clientHeight;
    if ( options.height ){
      canvas.height = options.height;
    }else{
      canvas.height = ( Math.max(window.innerHeight, document.body.clientHeight) ) / 2.5;
    }

    // move the context co-ordinates to the bottom middle of the screen
    ctx.translate(canvas.width/2, canvas.height);

    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.strokeStyle = "rgba(255,0,0,0.9)";
    ctx.lineWidth = 5;
  }

  function _draw( frame ){
    if ( !frame ){ return; }

    // set up data array and other variables
    var pos, i, len;

    // cover the canvas with a 10% opaque layer for fade out effect.
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

    // set the fill to black for the points
    ctx.fillStyle = "rgba(0,0,0,0.9)";

    // loop over the frame's pointables

    for ( i=0, len=frame.pointables.length; i<len; i++ ) {
      // get the pointable and its position
      pos = frame.pointables[i].tipPosition;

      // draw the circle where the pointable is
      ctx.beginPath();
      ctx.arc( pos[0]-radius/2 ,-(pos[1]-radius/2),radius,0,2*Math.PI );
      ctx.fill();
      ctx.stroke();

    }
  }

  /**
   * Public API below
   */

  function publicInit( options ){
    return _init( options );
  }

  function publicDraw( frame ){
    _draw( frame );
  }

  return {
    init: publicInit,
    draw: publicDraw
  }

}();