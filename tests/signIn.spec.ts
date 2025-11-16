import { test, expect, request } from '@playwright/test';
import { RegisterPage } from '../pages/signUpPage';
import TestData from '../data/testData.json';
import { BackendUtils } from '../utils/backendUtils';

let registerPage: RegisterPage;
let backendUtils: BackendUtils;

test.beforeEach(async ({ page }) => {

  registerPage = new RegisterPage(page);

  // Go to Sign In page
  await registerPage.visitSignUpUrl();

});

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

});

test("TC-003: Redirect user to the login page after sign in", async ({ page }) => {

  const randomEmail = "Tom" + Math.floor(Math.random() * 1000) + "@fakemail.com";

  // Fill the form and click the btn

  await registerPage.registerUser("Tomas", "Lombardi", randomEmail, "tom123");

  // Confirm the successful signup message
  await expect(page.getByText(registerPage.successfulSignUpMessage)).toBeVisible();

  await page.waitForURL("http://localhost:3000/login");

  await page.waitForTimeout(3000);

});


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
    firstName: TestData.validUser.firstName,
    lastName: TestData.validUser.lastName,
    email: email,


  }))
});


test("TC-005: Verify successful sign up and API's response", async ({ page, request }) => {

  // First, the user must be created to triger the API response code (201 Created)
  await test.step("Fill the sign up form", async () => {

    const email = (TestData.validUser.email.split("@"))[0] + Math.floor(Math.random() * 1000) + "@" + (TestData.validUser.email.split("@"))[1];

    await registerPage.fillSignUpForm(

      TestData.validUser.firstName,
      TestData.validUser.lastName,
      email,
      TestData.validUser.password

    )

    // Step 2: Intercept the API's response

    // The ** means, it doesn't matter the environment as long as the endpoint is api/auth/signup

    const apiResponseEndpoint = page.waitForResponse("**/api/auth/signup");

    // Step 3: Click the Signup btn

    await registerPage.clickSignUpBtn();

    // Step 4: Wait for the API response

    const response = await apiResponseEndpoint;

    // Step 5: Catch the response body

    const responseBody = await response.json();

    // Assert the code status is 201
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
      firstName: TestData.validUser.firstName,
      lastName: TestData.validUser.lastName,
      email: email,

    }))

    // Step 7: Catch the assertion

    await expect(page.getByText("Registro exitoso!")).toBeVisible();

  })
});

test("TC-006: Email already exists in the API", async ({ page, request }) => {

  const email = (TestData.validUser.email.split("@"))[0] + Math.floor(Math.random() * 1000) + "@" + (TestData.validUser.email.split("@"))[1];

  // Catch the request's response (409)

  await page.route("**/api/auth/signup", route => {

    route.fulfill({

      status: 409,
      contentType: "application/json",
      body: JSON.stringify({ message: "Email already in use" })

    });
  })

  // Fill the Sign in form

  await registerPage.registerUser (

    TestData.validUser.firstName,
    TestData.validUser.lastName,
    email,
    TestData.validUser.password

  )
  // Step : Catch the assertion

    await expect(page.getByText("Email already in u")).toBeVisible();
});


test("TC-007: Create sign up from the API", async ({ page, request }) => {

  const email = (TestData.validUser.email.split("@"))[0] + Math.floor(Math.random() * 1000) + "@" + (TestData.validUser.email.split("@"))[1];
  //const backenResponse = await backendUtils.sendSignUpRequest("http://localhost:6007/api/auth/signup");
  const endpoint = "http://localhost:6007/api/auth/signup";

  const response = await request.post(endpoint, {

    headers: {

      "Accept": "application/vnd.api+json",
      'Content-Type': "application/json",
    },

    data: {

      firstName: TestData.validUser.firstName,
      lastName: TestData.validUser.lastName,
      email: email,
      password: TestData.validUser.password
    },
  })

  

})

test("TC-008: Simulate server error (500) on signup and verify frontend reaction", async ({ page }) => {

  const email = (TestData.validUser.email.split("@"))[0] + Math.floor(Math.random() * 1000) + "@" + (TestData.validUser.email.split("@"))[1];

  // Intercept the signup POST and return a 500 error
  await page.route("**/api/auth/signup", async route => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' })
    });
  });

  // Fill the signup form
  await registerPage.fillSignUpForm(
    TestData.validUser.firstName,
    TestData.validUser.lastName,
    email,
    TestData.validUser.password
  );

  // Click sign up and wait for the intercepted response
  const [response] = await Promise.all([
    page.waitForResponse('**/api/auth/signup'),
    registerPage.clickSignUpBtn()
  ]);

  // Assert we got the mocked 500 response
  expect(response.status()).toBe(500);

  // The UI should not show the successful signup message
  await expect(page.getByText(registerPage.successfulSignUpMessage)).toHaveCount(0);

});