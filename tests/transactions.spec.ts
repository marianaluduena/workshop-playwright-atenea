import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalCreateAccount } from '../pages/modalCreateAccount';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let modalCreateAccount: ModalCreateAccount;

// User's extensions to login with the session storage

const userSends = test.extend({

  storageState: require.resolve("../playwright/.auth/userSendsMoney.json"),

});

const userReceives = test.extend({

  storageState: require.resolve("../playwright/.auth/userReceivesMoney.json"),

});

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  modalCreateAccount = new ModalCreateAccount(page);

  // Go to Login page
  //await loginPage.visitLoginUrl();

  await dashboardPage.visitDashboardUrl();

  // Fill the form and click the btn
  //await loginPage.loginUser("ana-prince@fake.com", "ana123");

  // Successful login message

  //await expect(page.getByText(loginPage.successfulLoginMessage)).toBeVisible();

})

/*

test("TC-005: Create an account", async ({ page }) => {

  // Click the Plus btn

  await dashboardPage.addAccountBtn.click();
  await modalCreateAccount.selectAnAccount("Débito");
  await modalCreateAccount.initialAmount.fill("1500");
  await modalCreateAccount.createAccountBtn.click();

  await page.waitForTimeout(3000);

})*/


userSends("TC-006: Verify the user can send money to an account", async({page}) =>{

  await expect(dashboardPage.mainTitle).toBeVisible(); 

});
