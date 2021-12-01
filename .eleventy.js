const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');

const md = markdownIt({
  html: true,
});

function renderMd(content, inline) {
  return inline ? md.renderInline(content) : md.render(content);
}

const dir = {
  input: 'src',
  includes: '_includes',
  output: 'dist',
};

module.exports = function (config) {
  config.addPairedShortcode('renderTemplateMd', renderMd);

  // i.e. from src/assets
  config.addPassthroughCopy(`${dir.input}/assets`);
  config.addPassthroughCopy(`${dir.input}/js`);
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(syntaxHighlight);

  config.addFilter('addNavAria', addNavAria);

  return {
    dir,
  };
};

function addNavAria(fragment, page) {
  const href = `href="${page.url}"`;
  const start = fragment.indexOf(href);
  return start > -1 ? insertNavAria(fragment, start + href.length) : fragment;
}

function insertNavAria(fragment, index) {
  return (
    fragment.slice(0, index) + ` aria-current="page"` + fragment.slice(index)
  );
}
