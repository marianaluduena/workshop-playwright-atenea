import { Page, Locator} from "@playwright/test";


export class RegisterPage {

    readonly page: Page;
    readonly name: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly signUpBtn: Locator;
    readonly successfulSignUpMessage: string;
    readonly emailAlreadyExistsMessage: string;

    constructor(page: Page) {

        this.page = page; // The browser's tab that opens every time the test case is executed
        this.name = page.getByRole('textbox', { name: 'Nombre' });
        this.lastName = page.locator('[name="lastName"]');
        this.email = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.password = page.getByRole('textbox', { name: 'Contraseña' });
        this.signUpBtn = page.getByTestId('boton-registrarse');
        this.successfulSignUpMessage = "Registro exitoso!";
        this.emailAlreadyExistsMessage = "Email already in use";
    }

    // Actions

    async visitSignUpUrl() {

        await this.page.goto('http://localhost:3000/signup');

        await this.page.waitForLoadState("domcontentloaded");
    }

    async fillSignUpForm(name: string, lastName: string, email: string, password: string) {

        await this.name.fill(name);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
    }

    async clickSignUpBtn() {

        await this.signUpBtn.click();
    }

    async registerUser(name: string, lastName: string, email: string, password: string) {

        await this.fillSignUpForm(name, lastName, email, password);
        await this.clickSignUpBtn();
    }
}