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
/*
setup("Create and login the user that will receive money", async ({ page, request: apiRequest }) => {


    // Ensure the user exists via API to avoid UI flakiness on CI
    await apiRequest.post('http://localhost:6007/api/auth/signup', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            firstName: 'Johnny',
            lastName: 'Rico',
            email: 'johnny-soy-rico@fake.com',
            password: '123456'
        }
    }).catch(() => { });

    await loginPage.loginUser("johnny-soy-rico@fake.com", "123456");
    await page.waitForURL("http://localhost:3000/dashboard", { timeout: 60000 });

    // Store user's session

    await page.context().storageState({path: userReceivesMoneyAuthFile });
    await page.waitForTimeout(2000);

})*/

setup("Create and login the user that will receive money", async ({ page, request: apiRequest }) => {


    // Ensure the user exists via API to avoid UI flakiness on CI
    await apiRequest.post('http://localhost:6007/api/auth/signup', {
        headers: { 'Content-Type': 'application/json' },
        data: {
            firstName: 'Johnny',
            lastName: 'Rico',
            email: 'johnny-soy-rico@fake.com',
            password: '123456'
        }
    }).catch(() => { /* ignore errors if user already exists */ });

    await loginPage.loginUser("johnny-soy-rico@fake.com", "123456");
    await page.waitForURL("http://localhost:3000/dashboard", { timeout: 60000 });

    // Store user's session

    await page.context().storageState({path: userReceivesMoneyAuthFile });
    await page.waitForTimeout(2000);

})
