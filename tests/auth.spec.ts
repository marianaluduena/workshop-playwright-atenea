import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { beforeEach } from 'node:test';


let loginPage: LoginPage;

// Login happy path scenarios test suite


/*describe("Login happy path scenarios test suite", function () {

})*/

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);

  // Step 1: Go to Login page
  await loginPage.visitLoginUrl();

})

test("TC-004: Successful login", async ({ page }) => {


  // Step 2: Fill the form and click the login btn
  await loginPage.loginUser("ana-prince@fake.com", "ana123");

  // Step 3: Confirm the user is in the dashboard page
  await page.waitForURL("http://localhost:3000/dashboard");

  // Step 4: Assert Successful login message
  await expect(page.getByText(loginPage.successfulLoginMessage)).toBeVisible();

  // Step 5: Verifiy the Dashboard has a title

  await expect(page.getByText(loginPage.dashboardTitle)).toBeVisible();

})

// Negative scenarios

test("TC-005: Login with invalid credentials", async ({ page }) => {

  // Step 2: Fill the form with a valid email and an invalid password, then click the login btn
  await loginPage.loginUser("ana-prince@fake.com", "ana");

  // Step 3: Confirm the user remains in the login page
  await page.waitForURL("http://localhost:3000/login");

  // Step 4: Assert invalid credentials message
  await expect(page.getByText(loginPage.invalidCredentialsMessage)).toBeVisible();
})

test("TC-006: Login without credentials", async ({ page }) => {

  // Step 2: Leave the fields empty and click the login btn
  await loginPage.loginBtn.click();

  // Step 3: Assert the email is required message


  // Step 4: Assert the password is required message

  // Step 5: Confirm the user remains in the login page
  await page.waitForURL("http://localhost:3000/login");

})