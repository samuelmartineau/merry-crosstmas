global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

require("../test/polyfills/MutationObserver.js")(global);
require("../test/polyfills/getSelection.js")(global);
