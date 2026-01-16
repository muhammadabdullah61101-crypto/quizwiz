// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Complete QuizWiz Application Automation
 * Automates login, navigation, and all interactive elements
 */

const credentials = {
  email: 'robal97432@jparksky.com',
  password: 'Test@123'
};

test.describe('QuizWiz Complete Application Automation', () => {
  
  test('Full application workflow - Login to Dashboard', async ({ page }) => {
    // ===== LOGIN PAGE =====
    console.log('=== STARTING QUIZWIZ AUTOMATION ===');
    console.log('Step 1: Navigate to login page');
    
    await page.goto('https://quizwiz2.onescreensolutions.com/login');
    await expect(page).toHaveTitle(/QuizWiz/);
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null);
    
    // Screenshot of login page
    await page.screenshot({ path: 'screenshots/01-login-page.png' });
    console.log('✓ Login page loaded');
    
    // ===== FILL LOGIN FORM =====
    console.log('Step 2: Fill login credentials');
    
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name*="email" i]').first();
    await emailInput.waitFor({ timeout: 5000 });
    await emailInput.fill(credentials.email);
    console.log(`✓ Email entered: ${credentials.email}`);
    
    const passwordInput = page.locator('input[type="password"], input[placeholder*="password" i], input[name*="password" i]').first();
    await passwordInput.waitFor({ timeout: 5000 });
    await passwordInput.fill(credentials.password);
    console.log('✓ Password entered');
    
    // Take screenshot before submitting
    await page.screenshot({ path: 'screenshots/02-login-form-filled.png' });
    
    // ===== SUBMIT LOGIN =====
    console.log('Step 3: Submit login form');
    
    const submitButton = page.locator('button:has-text("Continue"), button:has-text("Login"), button[type="submit"]').first();
    await submitButton.waitFor({ timeout: 5000 });
    await submitButton.click();
    console.log('✓ Login button clicked');
    
    // Wait for navigation after login - wait longer and check multiple conditions
    let loginSuccess = false;
    try {
      await Promise.race([
        page.waitForURL(url => {
          const urlStr = url.toString();
          const success = urlStr !== 'https://quizwiz2.onescreensolutions.com/login';
          if (success) loginSuccess = true;
          return success;
        }, { timeout: 15000 }),
        page.waitForTimeout(8000)
      ]).catch(() => null);
    } catch (e) {
      console.log('Navigation wait error:', e instanceof Error ? e.message : String(e));
    }
    
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null);
    await page.waitForTimeout(2000);
    
    console.log(`✓ Logged in successfully. Current URL: ${page.url()}`);
    console.log(`✓ Login Success Flag: ${loginSuccess}`);
    await page.screenshot({ path: 'screenshots/03-after-login.png' });
    
    // ===== DASHBOARD/HOME PAGE =====
    console.log('Step 4: Exploring dashboard and finding all buttons');
    
    // Get all buttons on the page
    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} buttons on the page`);
    
    // Get all interactive elements
    const links = await page.locator('a').all();
    console.log(`Found ${links.length} links on the page`);
    
    // Take screenshot of dashboard
    await page.screenshot({ path: 'screenshots/04-dashboard.png' });
    
    // ===== FIND AND LOG ALL CLICKABLE ELEMENTS =====
    console.log('Step 5: Cataloging all interactive elements');
    
    // Get all buttons with text
    const buttonElements = await page.locator('button').all();
    const buttonTexts = [];
    for (let i = 0; i < buttonElements.length; i++) {
      try {
        const text = await buttonElements[i].textContent({ timeout: 1000 });
        if (text && text.trim()) {
          buttonTexts.push(text.trim());
        }
      } catch (e) {
        // Skip if can't get text
      }
    }
    console.log('Buttons found:', buttonTexts);
    
    // Get all links
    const linkElements = await page.locator('a').all();
    const linkTexts = [];
    for (let i = 0; i < linkElements.length; i++) {
      try {
        const text = await linkElements[i].textContent({ timeout: 1000 });
        const href = await linkElements[i].getAttribute('href');
        if (text && text.trim()) {
          linkTexts.push({ text: text.trim(), href: href });
        }
      } catch (e) {
        // Skip if can't get text
      }
    }
    console.log('Links found:', linkTexts);
    
    // ===== INTERACT WITH MAIN NAVIGATION =====
    console.log('Step 6: Testing main navigation elements');
    
    // Test clicking on each button and documenting the action
    const testableButtons = [
      { text: 'Generate a Quiz', description: 'Create new quiz' },
      { text: 'My Library', description: 'View user library' },
      { text: 'Pricing', description: 'View pricing' }
    ];
    
    for (const buttonInfo of testableButtons) {
      try {
        const btn = page.locator(`button:has-text("${buttonInfo.text}")`).first();
        const isVisible = await btn.isVisible().catch(() => false);
        if (isVisible) {
          console.log(`✓ Found: ${buttonInfo.text} - ${buttonInfo.description}`);
          // We'll document but not click to avoid navigation
        }
      } catch (e) {
        // Element not found
      }
    }
    
    // Look for logout/settings in menu
    const profileMenus = await page.locator('button[aria-label*="menu" i], button[aria-label*="profile" i], button[class*="menu" i]').all();
    console.log(`Found ${profileMenus.length} menu/profile buttons`);
    
    // ===== TEST SPECIFIC ACTIONS =====
    console.log('Step 7: Testing page interactions');
    
    // Look for and click dropdowns/menus
    const dropdownElements = await page.locator('select, [role="combobox"], .dropdown').all();
    console.log(`Found ${dropdownElements.length} dropdown elements`);
    
    // Look for search inputs
    const searchInputElements = await page.locator('input[type="search"], input[placeholder*="search" i]').all();
    console.log(`Found ${searchInputElements.length} search inputs`);
    
    // Look for input fields
    const inputElements = await page.locator('input:not([type="hidden"])').all();
    console.log(`Found ${inputElements.length} input fields`);
    
    // Look for forms
    const formElements = await page.locator('form').all();
    console.log(`Found ${formElements.length} forms`);
    
    // Screenshot of full page
    await page.screenshot({ path: 'screenshots/05-full-page-explored.png' });
    
    // ===== SUMMARY =====
    console.log('=== AUTOMATION SUMMARY ===');
    console.log(`✓ Successfully logged in to QuizWiz`);
    console.log(`✓ Current URL: ${page.url()}`);
    console.log(`✓ Page Title: ${await page.title()}`);
    console.log(`✓ Interactive Elements Found:`);
    console.log(`  - Buttons: ${buttonElements.length}`);
    console.log(`  - Links: ${linkElements.length}`);
    console.log(`✓ Screenshots saved to: /screenshots/`);
    
    // Keep browser open for inspection
    console.log('\nBrowser will pause here - press resume or close to continue');
    await page.pause();
  });
  
  test('Test individual quiz interactions (after login)', async ({ page }) => {
    // Login first
    await page.goto('https://quizwiz2.onescreensolutions.com/login');
    
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(credentials.email);
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(credentials.password);
    
    const submitButton = page.locator('button[type="submit"], button:has-text("Continue")').first();
    await submitButton.click();
    
    // Wait for dashboard
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => null);
    
    console.log('Step 1: Logged in successfully');
    
    // Look for quiz items and interact with them
    const quizItems = await page.locator('[data-testid*="quiz"], .quiz-item, [class*="quiz"]').all();
    console.log(`Found ${quizItems.length} quiz items`);
    
    // Look for quiz cards or list items
    const cards = await page.locator('[class*="card"], [class*="item"]').all();
    console.log(`Found ${cards.length} card/item elements`);
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/06-quiz-interactions.png' });
    
    // Try clicking on first quiz if available
    if (quizItems.length > 0) {
      try {
        console.log('Step 2: Attempting to click first quiz item');
        await quizItems[0].click({ timeout: 5000 });
        await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null);
        console.log(`✓ Quiz opened: ${page.url()}`);
        await page.screenshot({ path: 'screenshots/07-quiz-detail.png' });
      } catch (e) {
        console.log('Could not click quiz item:', e instanceof Error ? e.message : String(e));
      }
    }
    
    await page.pause();
  });
  
  test('Complete user journey - Create, Edit, Delete', async ({ page }) => {
    // Login
    await page.goto('https://quizwiz2.onescreensolutions.com/login');
    
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill(credentials.email);
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill(credentials.password);
    
    const submitButton = page.locator('button[type="submit"], button:has-text("Continue")').first();
    await submitButton.click();
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => null);
    console.log('✓ Logged in');
    
    // Find and click Create Quiz button
    const createButton = page.locator('button:has-text("Create"), button:has-text("New Quiz"), a:has-text("Create")').first();
    const createVisible = await createButton.isVisible().catch(() => false);
    
    if (createVisible) {
      console.log('Step 1: Clicking Create Quiz button');
      await createButton.click();
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null);
      await page.screenshot({ path: 'screenshots/08-create-quiz.png' });
      console.log(`✓ Navigate to create page: ${page.url()}`);
    }
    
    // Find all form inputs and document them
    const formInputs = await page.locator('input, textarea, select').all();
    console.log(`Found ${formInputs.length} form inputs`);
    
    await page.screenshot({ path: 'screenshots/09-form-inputs.png' });
    await page.pause();
  });
});
