import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalCreateAccount } from '../pages/modalCreateAccount';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let modalCreateAccount: ModalCreateAccount;

test.beforeEach(async ({ page }) =>{

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  modalCreateAccount = new ModalCreateAccount(page);

  // Go to Login page
  await loginPage.visitLoginUrl();

  // Fill the form and click the btn
  await loginPage.loginUser("ana-prince@fake.com", "ana123");

  // Successful login message

  await expect(page.getByText(loginPage.successfulLoginMessage)).toBeVisible();

})

test("TC-005: Create an account", async ({ page }) => {

  // Click the Plus btn

  await dashboardPage.createAccountBtn.click();
  await modalCreateAccount.selectAccount.click();
  await modalCreateAccount.debitOption.click();
  await modalCreateAccount.initialAmount.fill("1500");
  await modalCreateAccount.createAccountBtn.click();

  await page.waitForTimeout(3000);

})

