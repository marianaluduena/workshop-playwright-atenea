import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

let registerPage: RegisterPage;

test('TC-001: Sucessful signup', async ({ page }) => {

  // Variable to create a random email each time this TC runs

  const randomEmail = "peter-max" + Math.floor(Math.random() * 1000) + "@fakemail.com";

  registerPage = new RegisterPage(page);

  // Go to Sign In page
  await registerPage.visitSignUpUrl();

  // Fill the form and click the btn

  await registerPage.registerUser("Peter", "Maximoff", randomEmail, "peter123");

  // Confirm the successful signup message
  await expect(page.getByText(registerPage.successfulSignUpMessage)).toBeVisible();

  await page.waitForTimeout(3000);

});


test("TC-002: User already exists", async({page}) => {

  registerPage = new RegisterPage(page);

  // Go to Sign In page
  await registerPage.visitSignUpUrl();

  // Fill the form and click the btn
  await registerPage.registerUser("Ana", "Prince", "ana-prince@fake.com", "ana123");

  // Email already exists message
  await expect(page.getByText(registerPage.emailAlreadyExistsMessage)).toBeVisible();
  
  await page.waitForTimeout(3000);

})

test("TC-003: Redirect user to the login page after sign in", async({page}) =>{

  registerPage = new RegisterPage(page);

  const randomEmail = "Tom" + Math.floor(Math.random() * 1000) + "@fakemail.com";

  // Go to Sign In page
  await registerPage.visitSignUpUrl();


  // Fill the form and click the btn

  await registerPage.registerUser("Tomas", "Lombardi", randomEmail, "tom123");

  // Confirm the successful signup message
  await expect(page.getByText(registerPage.successfulSignUpMessage)).toBeVisible();

  await page.waitForURL("http://localhost:3000/login");

  await page.waitForTimeout(3000);

})

