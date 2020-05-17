
declare const window: any;
/**
 * User Story ID: M1NG6
 * Description: Use the appropiate Request Animation Function specifict to the platform.
 */
export const requestAnimationFrame = (function() {
  let reqAnimFrame = window.requestAnimationFrame
                    || window.mozRequestAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || window.msRequestAnimationFrame;

  if (!reqAnimFrame) {
    //TODO: Report Error User Browser Doesnt Support Request Animation Frame!
    console.error('APP-ERROR: User browser does not support requestAnimationFrame()!')
    throw new Error('NotSupportedError: User browser does not support requestAnimationFrame()!');
  }
  return reqAnimFrame;
})();

/**
 * User Story ID: M1NG6
 * Description: Use the appropiate Cancel Animation Function specifict to the platform.
 */
export const cancelAnimationFrame = (function() {
  
  let cancelAnimFrame = window.cancelAnimationFrame
                    || window.mozCancelAnimationFrame
                    || window.webkitCancelAnimationFrame
                    || window.msCancelAnimationFrame;

  if (!cancelAnimFrame) {
    //TODO: Report Error User Browser Doesnt Support Cequest Animation Frame!
    console.error('APP-ERROR: User browser does not support cancelAnimationFrame()!')
    throw new Error('NotSupportedError: User browser does not support cancelAnimationFrame()!');
  }
  return cancelAnimFrame;
})();