import { Page, Locator} from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly registerLink: Locator;
    readonly createAccountBtn: Locator;
    readonly successfulLoginMessage: string;

    constructor(page: Page) {

        this.page = page;
        this.email = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.password = page.getByRole('textbox', { name: 'Contraseña' });
        this.loginBtn = page.getByTestId('boton-login');
        this.registerLink = page.getByTestId('link-registrarse-login');
        this.createAccountBtn = page.getByTestId('boton-signup-header'); 
        this.successfulLoginMessage = "Inicio de sesión exitoso";
    }

    // Actions

    async visitLoginUrl() {

        await this.page.goto('http://localhost:3000/login');

        await this.page.waitForLoadState("domcontentloaded");
    }

    async fillLoginForm(email: string, password: string) {

        await this.email.fill(email);
        await this.password.fill(password);
    }

    async clickLoginBtn() {

        await this.loginBtn.click();
    }

    async loginUser(email: string, password: string) {

        await this.fillLoginForm(email, password);
        await this.clickLoginBtn();
    }
}