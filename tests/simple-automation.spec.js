// @ts-check
const { test } = require('@playwright/test');

const email = 'robal97432@jparksky.com';
const password = 'Test@123';

test('QuizWiz Complete Automation', async ({ page }) => {
  // Login
  await page.goto('https://quizwiz2.onescreensolutions.com/login');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  
  console.log('✓ Logged in');
  
  // Click Generate button
  const generateBtn = page.locator('button:has-text("Generate")').first();
  if (await generateBtn.isVisible().catch(() => false)) {
    await generateBtn.click();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked Generate');
  }
  
  // Click My Library button
  const libraryBtn = page.locator('button:has-text("My Library")').first();
  if (await libraryBtn.isVisible().catch(() => false)) {
    await libraryBtn.click();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked My Library');
  }
  
  console.log('✓ Automation complete');
});
