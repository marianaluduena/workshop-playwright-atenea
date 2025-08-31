import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

test("TC-004: Successful login", async ({ page }) => {

  loginPage = new LoginPage(page);

  // Go to Login page
  await loginPage.visitLoginUrl();

  // Fill the form and click the btn
  await loginPage.loginUser("ana-prince@fake.com", "ana123");

  // Successful login message

  await expect(page.getByText(loginPage.successfulLoginMessage)).toBeVisible();

  // Confirm the user is in the dashboard page

  await page.waitForURL("http://localhost:3000/dashboard");

  await page.waitForTimeout(3000);

})

