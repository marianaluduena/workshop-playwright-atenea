import { Page, Locator } from "@playwright/test";

export class ModalCreateAccount {

    readonly page: Page;
    readonly selectAccount: Locator;
    readonly debitOption: Locator;
    readonly initialAmount: Locator;
    readonly createAccountBtn: Locator;


    constructor(page: Page) {

        this.page = page;
        this.selectAccount = this.page.getByRole('combobox', { name: 'Tipo de cuenta *' });
        this.debitOption = this.page.getByRole('option', { name: 'Débito' });
        this.initialAmount = this.page.getByRole('spinbutton', { name: 'Monto inicial *' });
        this.createAccountBtn = this.page.getByTestId('boton-crear-cuenta');
        
    }

    // Actions


}