const puppeteer = require('puppeteer');
const captures = require('./captures.json');

const ORIGIN = 'http://localhost:8080/';
const TARGET_FOLDER = './dist/screenshots/';

async function runBrowserTask(p, task) {
  const browser = await p.launch({ dumpio: false });
  try {
    await task(browser);
  } finally {
    return browser.close();
  }
}

function captureTask(origin, folder, captures) {
  return async (browser) => {
    const pathResults = await Promise.allSettled(
      captures.map(capturePath(origin, folder, browser))
    );
    reportRejections(pathResults);
    return pathResults;
  };
}

function reportRejections(results) {
  for (const obj of results)
    if (obj.status === 'rejected') console.log(obj.reason);

  return results;
}

function capturePath(origin, folder, browser) {
  return async (pathInfo) => {
    const href = origin + pathInfo.path;
    const viewResults = await Promise.allSettled(
      pathInfo.views.map(captureView(href, folder, browser))
    );
    reportRejections(viewResults);
    return viewResults;
  };
}

function captureView(href, folder, browser) {
  return async (view) => {
    const viewport = {
      width: view.width,
      height: 800,
      deviceScaleFactor: 1,
    };

    const page = await browser.newPage();
    await page.evaluateOnNewDocument(setCapture);
    await page.setViewport(viewport);
    await page.goto(href);

    const shotResults = await Promise.allSettled(
      view.shots.map(captureShot(folder, page))
    );
    reportRejections(shotResults);
    return shotResults;
  };
}

function setCapture() {
  document.addEventListener('readystatechange', readyStateListener);

  function readyStateListener(event) {
    switch (event.target.readyState) {
      case 'interactive':
      case 'complete':
        document.documentElement.classList.add('js-screencapture');
        document.removeEventListener('readystatechange', readyStateListener);
        break;
    }
  }
}

function captureShot(folder, page) {
  return (shot) => {
    const targetPath = folder + shot.target + '.png';

    return shot.hasOwnProperty('selector')
      ? shotSelector(targetPath, shot.selector, page)
      : shotFullPage(targetPath, page);
  };
}

function shotFullPage(path, page) {
  return page.screenshot({
    path,
    fullPage: true,
  });
}

async function shotSelector(path, selector, page) {
  const element = await page.$(selector);
  if (element === null)
    throw new Error(
      `Target: "${path}" - No element for selector "${selector}"`
    );

  return element.screenshot({
    path,
  });
}

const fmt = Intl.DateTimeFormat('default', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

runBrowserTask(puppeteer, captureTask(ORIGIN, TARGET_FOLDER, captures)).then(
  () =>
    console.log(
      `screen captures complete: ${fmt.format(new Date())}. OK to terminate`
    )
);
