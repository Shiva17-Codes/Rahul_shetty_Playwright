const {test,expect} = require('@playwright/test');

test('Home page',async ({ page }) => {

  await page.goto('https://www.demoblaze.com/');

  const pagetitle = await page.title();

  console.log('Page title is ',pagetitle);

  await expect(page).toHaveTitle('STORE');

  const pageurl=page.url();
  console.log('Page url is ',pageurl);
  await expect(page).toHaveURL('https://www.demoblaze.com/');

  await page.close();

});