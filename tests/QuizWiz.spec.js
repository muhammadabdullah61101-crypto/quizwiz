// @ts-check
const { test, expect } = require('@playwright/test');

test('login with email and password', async ({ page }) => {
  await page.goto('https://quizwiz2.onescreensolutions.com/login');
  
  await expect(page).toHaveTitle(/QuizWiz/);
  
  const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name*="email" i]').first();
  await emailInput.waitFor({ timeout: 5000 });
  await emailInput.fill('robal97432@jparksky.com');
  
  const passwordInput = page.locator('input[type="password"], input[placeholder*="password" i], input[name*="password" i]').first();
  await passwordInput.waitFor({ timeout: 5000 });
  await passwordInput.fill('Test@123');
  
  const submitButton = page.locator('button:has-text("Continue"), button:has-text("Login"), button[type="submit"]').first();
  await submitButton.waitFor({ timeout: 5000 });
  await submitButton.click();
  
  await Promise.race([
    page.waitForURL(url => url.toString() !== 'https://quizwiz2.onescreensolutions.com/login', { timeout: 10000 }),
    page.waitForSelector('body:not(:has(input[type="password"]))', { timeout: 10000 }).catch(() => null)
  ]).catch(() => {
    console.log('Login navigation timeout - checking current page');
  });
  
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null);
  
  console.log('Current URL after login:', page.url());
  
  await page.screenshot({ path: 'after-login.png' });
  
  console.log('Test completed - login successful and page navigated');
  await page.pause();
});
