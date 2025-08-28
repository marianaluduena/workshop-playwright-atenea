import { test, expect } from '@playwright/test';

test.only('Sucessful login', async ({ page }) => {

  // Variable to create a random email each time this TC runs

  const randomEmail = "anna.anders"+  Math.floor(Math.random() * 1000) + "@fakemail.com";

  await page.goto('http://localhost:3000/signup');

  await page.locator('[name="firstName"]').fill("Anna");
  await page.locator('[name="lastName"]').fill("Andersen");
  await page.locator('[name="email"]').fill(randomEmail);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill("anna123");
  await page.getByTestId("boton-registrarse").click();

  await expect(page.getByText("Registro exitoso!")).toBeVisible();

  await page.waitForTimeout(5000);

});


