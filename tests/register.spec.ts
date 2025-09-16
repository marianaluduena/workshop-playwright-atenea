import { test, expect, request } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import TestData from '../data/testData.json';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {

  registerPage = new RegisterPage(page);

  // Go to Sign In page
  await registerPage.visitSignUpUrl();

})

test('TC-001: Sucessful signup', async ({ page }) => {

  // Variable to create a random email each time this TC runs

  const randomEmail = "peter-max" + Math.floor(Math.random() * 1000) + "@fakemail.com";

  // Fill the form and click the btn

  await registerPage.registerUser("Peter", "Maximoff", randomEmail, "peter123");

  // Confirm the successful signup message
  await expect(page.getByText(registerPage.successfulSignUpMessage)).toBeVisible();

  await page.waitForTimeout(3000);

});


test("TC-002: User already exists", async ({ page }) => {

  // Fill the form and click the btn
  await registerPage.registerUser("Ana", "Prince", "ana-prince@fake.com", "ana123");

  // Email already exists message
  await expect(page.getByText(registerPage.emailAlreadyExistsMessage)).toBeVisible();

  await page.waitForTimeout(3000);

})

test("TC-003: Redirect user to the login page after sign in", async ({ page }) => {

  const randomEmail = "Tom" + Math.floor(Math.random() * 1000) + "@fakemail.com";

  // Fill the form and click the btn

  await registerPage.registerUser("Tomas", "Lombardi", randomEmail, "tom123");

  // Confirm the successful signup message
  await expect(page.getByText(registerPage.successfulSignUpMessage)).toBeVisible();

  await page.waitForURL("http://localhost:3000/login");

  await page.waitForTimeout(3000);

})

test("TC-004: Verify the user sign ups from the API", async ({ page, request }) => {

  // The 1rst split [0] will get everything before the @, and the 2nd will get everything after the @

  const email = (TestData.validUser.email.split("@"))[0] + Math.floor(Math.random() * 1000) + "@" + (TestData.validUser.email.split("@"))[1];

  const response = await request.post("http://localhost:6007/api/auth/signup", {

    headers: {

      'Content-Type': "application/json",
    },

    // Request data 

    data: {

      firstName: TestData.validUser.firstName,
      lastName: TestData.validUser.lastName,
      email: email,
      password: TestData.validUser.password

    },

  });

  // Save server's response expected to be in json format
  const responseBody = await response.json();

  // Assert the code status is 201 (Created)
  expect(response.status()).toBe(201);

  // Confirm the response body has a token
  expect(responseBody).toHaveProperty("token");

  //Confirm the token is a string
  expect(typeof responseBody.token).toBe("string");

  // Confirm the reponse body has a user
  expect(responseBody).toHaveProperty("user");

  // Confirm the response body property "user" as an object

  expect(responseBody.user).toEqual(expect.objectContaining({

    id: expect.any(String),
    firstName: "Jazmín",
    lastName: "Schwann",
    email: email,


  }))
})
