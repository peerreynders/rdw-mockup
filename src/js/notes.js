function initialize() {
  if (document.documentElement.classList.contains('js-screencapture')) {
    return;
  }

  const key = 'note_' + window.location.pathname;
  const retrieveNote = () => window.localStorage.getItem(key);
  const storeNote = (content) => {
    if (content) window.localStorage.setItem(key, content);
    else window.localStorage.removeItem(key);
  };

  const note = document.querySelector('#notes');
  const showNote = (content) => {
    note.innerHTML = content;
  };
  const getNote = () => note.innerHTML;

  showNote(retrieveNote());

  const saveButton = document.querySelector('#save-notes');
  saveButton.addEventListener('click', function (_event) {
    storeNote(getNote());
  });

  const clearButton = document.querySelector('#clear-notes');
  clearButton.addEventListener('click', function (_event) {
    storeNote(null);
    showNote('');
  });
}

function schedule(_event) {
  Promise.resolve().then(initialize);
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
else schedule();
