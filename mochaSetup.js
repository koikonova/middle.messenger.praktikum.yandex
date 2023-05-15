const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000',
});

const { window } = dom;

global.window = window;
global.document = window.document;

require.extensions['.scss'] = () => {
  module.exports = () => ({});
};