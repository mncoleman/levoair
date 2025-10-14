import puppeteer from 'puppeteer';

(async () => {
  const url = process.argv[2] || 'http://localhost:9090/levoair/';
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure()));

  page.on('response', async res => {
    const status = res.status();
    if (status >= 400) console.log('BAD RESPONSE', res.url(), status);
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('GOTO ERROR:', e.toString()));

  // take screenshot
  await page.screenshot({ path: 'page_debug.png', fullPage: true });
  console.log('Saved screenshot to page_debug.png');

  await browser.close();
})();