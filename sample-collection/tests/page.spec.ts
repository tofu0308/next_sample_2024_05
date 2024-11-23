import test, { expect } from '@playwright/test';

test('HOMEにアクセスできる', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveURL('http://localhost:3000/');
});

test('Homeから各ページにアクセスできる', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('text=helloworld');
  await expect(page).toHaveURL('http://localhost:3000/helloworld');

  await page.goto('http://localhost:3000/');
  await page.click('text=counter');
  await expect(page).toHaveURL('http://localhost:3000/counter');

  await page.goto('http://localhost:3000/');
  await page.click('text=todo');
  await expect(page).toHaveURL('http://localhost:3000/todo');

  await page.goto('http://localhost:3000/');
  await page.click('text=modal');
  await expect(page).toHaveURL('http://localhost:3000/modal');
});
