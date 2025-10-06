import { test as setup } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { DashboardPage } from "../pages/dashboardPage";
import { ModalCreateAccount } from "../pages/modalCreateAccount";

// johnny-soy-rico@fake.com will receive money

// rick-sin-tierra@fake.com will transfer money

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let modalCreateAccount: ModalCreateAccount;

// Users

const userSendsMoneyAuthFile = "playwright/.auth/userSendsMoney.json";
const userReceivesMoneyAuthFile = "playwright/.auth/userReceivesMoney.json";

setup.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    modalCreateAccount = new ModalCreateAccount(page);

    await loginPage.visitLoginUrl();

})

// Login user that will send money
/*
setup("Login the user that will send money", async ({ page }) => {

    await loginPage.loginUser("rick-sin-tierra@fake.com", "123456");
    await dashboardPage.addAccountBtn.click();
    await modalCreateAccount.createAccount("Débito", "500");


    // Important: To capture the user's session, first the dashboard URL must be loaded 
    await page.waitForURL("http://localhost:3000/dashboard");

    // Store user's session

    await page.context().storageState({ path: userSendsMoneyAuthFile });
    await page.waitForTimeout(5000);

})*/

// Login the user that will receive money

setup("Login the user that will receive money", async ({ page }) => {

    await loginPage.loginUser("johnny-soy-rico@fake.com", "123456");
    await page.waitForURL("http://localhost:3000/dashboard");

    // Store user's session

    await page.context().storageState({path: userReceivesMoneyAuthFile });
    await page.waitForTimeout(5000);

})