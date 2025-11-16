import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { beforeEach } from 'node:test';
import TestData from '../data/testData.json';


let loginPage: LoginPage;
let dashboardPage: DashboardPage;
// Login happy path scenarios test suite


/*describe("Login happy path scenarios test suite", function () {

})*/

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);

  // Step 1: Go to Login page
  await loginPage.visitLoginUrl();

})

test("TC-009: Successful login", async ({ page }) => {


  // Step 2: Fill the form and click the login btn
  await loginPage.loginUserSuccessfully("ana-prince@fake.com", "ana123");

  // Step 3: Confirm the user is in the dashboard page
  await page.waitForURL("http://localhost:3000/dashboard");

  // Step 4: Assert Successful login message
  await expect(page.getByText(loginPage.successfulLoginMessage)).toBeVisible();

  // Step 5: Verifiy the Dashboard has a title

  await expect(page.getByText(loginPage.dashboardTitle)).toBeVisible();

  await page.waitForTimeout(5000);

})

// Negative scenarios

test("TC-010: Login with invalid credentials", async ({ page }) => {

  // Step 2: Fill the form with a valid email and an invalid password, then click the login btn
  await loginPage.loginAttemptWithInvalidCredentials("ana-prince@fake.com", "ana");

  // Step 3: Confirm the user remains in the login page
  await page.waitForURL("http://localhost:3000/login");

  // Step 4: Assert invalid credentials message
  await expect(page.getByText(loginPage.invalidCredentialsMessage)).toBeVisible();
})

test("TC-011: Login without credentials", async ({ page }) => {

  // Step 2: Leave the fields empty and click the login btn
  await loginPage.loginBtn.click();

  // Step 3: Assert the email is required message


  // Step 4: Assert the password is required message

  // Step 5: Confirm the user remains in the login page
  await page.waitForURL("http://localhost:3000/login");

})

test("TC-012: Login new user created via API", async ({ page, request }) => {

  const email = (TestData.validUser.email.split("@"))[0] + Math.floor(Math.random() * 1000) + "@" + (TestData.validUser.email.split("@"))[1];
  const response = await request.post("http://localhost:6007/api/auth/signup", {

    headers: {

      "Accept": "application/vnd.api+json",
      'Content-Type': "application/json",
    },

    data: {

      firstName: TestData.validUser.firstName,
      lastName: TestData.validUser.lastName,
      email: email,
      password: TestData.validUser.password
    }

  })

  const responseBody = await response.json();
  expect(response.status()).toBe(201);

  const responsePromiseLogin = page.waitForResponse("http://localhost:6007/api/auth/login");
  await loginPage.loginUserSuccessfully(email, TestData.validUser.password);

  const responseLogin = await responsePromiseLogin;
  const responseBodyLogin = await responseLogin.json();


  expect(responseLogin.status()).toBe(200);
  expect(responseBodyLogin).toHaveProperty("token");
  expect(typeof responseBodyLogin.token).toBe("string");
  expect(responseBodyLogin).toHaveProperty("user");
  expect(responseBodyLogin.user).toEqual(expect.objectContaining({

    id: expect.any(String),
    firstName: TestData.validUser.firstName,
    lastName: TestData.validUser.lastName,
    email: email,
  }));


  await expect(dashboardPage.mainTitle).toBeVisible();

});
