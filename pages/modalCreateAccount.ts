import { Page, Locator, expect } from "@playwright/test";

export class ModalCreateAccount {

    readonly page: Page;
    readonly selectAccount: Locator;
    readonly initialAmount: Locator;
    readonly createAccountBtn: Locator;
    readonly cancelBtn: Locator;
    readonly accountSuccessfulyCreatedMessage: string;


    constructor(page: Page) {

        this.page = page;
        this.selectAccount = this.page.getByRole('combobox', { name: 'Tipo de cuenta *' });
        this.initialAmount = this.page.getByRole('spinbutton', { name: 'Monto inicial *' });
        this.createAccountBtn = this.page.getByTestId('boton-crear-cuenta');
        this.cancelBtn = this.page.getByTestId('boton-cancelar-crear-cuenta');
        this.accountSuccessfulyCreatedMessage = '¡Cuenta creada exitosamente!';

    }

    // Actions

    // Select account

    async selectAnAccount(account: string) {

        await this.selectAccount.click();

        try {
            await this.page.getByRole("option", { name: account }).click();

        } catch (error) {

            console.log(`The option ${account} does not exist`);
        }
    }

    async fillInitialAmount(amount: string) {

        await this.initialAmount.fill(amount);
    }

    async createAccount(accountType: string, initialAmount: string){

        await this.selectAnAccount(accountType);
        await this.fillInitialAmount(initialAmount);
        await this.createAccountBtn.click();

        // Assert the account has been successfuly created

        await expect(this.page.getByText('¡Cuenta creada exitosamente!')).toBeVisible();

    }

}