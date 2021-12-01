const fsp = require('fs').promises;

const FILE_SCSS_BOOKTITLE = 'src/scss/components/_book-title.scss';

async function extractFromBookTitle() {
  const h1 = /(?:^\/\/\/\s*extract_h1\s*\n)(.*)(?:\n\/\/\/\s*end_h1\s*$)/ms;

  const result = {
    h1: null,
  };

  let fh = null;
  try {
    fh = await fsp.open(FILE_SCSS_BOOKTITLE, 'r');
    const content = await fh.readFile('utf8');
    const match = h1.exec(content);
    if (match) result.h1 = match[1];
  } finally {
    if (fh) await fh.close();
  }

  return result;
}

module.exports = async function () {
  const data = {
    snippets: {
      scss: {
        bookTitle: null,
      },
    },
  };

  data.snippets.scss.bookTitle = await extractFromBookTitle();

  return data;
};
