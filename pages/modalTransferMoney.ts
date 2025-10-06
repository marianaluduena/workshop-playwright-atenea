import { Page, Locator, expect } from "@playwright/test";

export class ModalTransferMoney {

    readonly page: Page;
    readonly email: Locator;
    readonly originAccountCombobox: Locator;
    readonly amount: Locator;
    readonly sendBtn: Locator;
    readonly cancelBtn: Locator;
    readonly accountTypeOption: Locator;
    readonly successMessage: string;



    constructor(page: Page) {

        this.page = page;
        this.email = this.page.getByRole('textbox', { name: 'Email del destinatario *' });
        this.originAccountCombobox = this.page.getByRole('combobox', { name: 'Cuenta origen *' });
        this.amount = this.page.getByRole('spinbutton', { name: 'Monto a enviar *' })
        this.sendBtn = this.page.getByRole('button', { name: 'Enviar' });
        this.cancelBtn = this.page.getByRole('button', { name: 'Cancelar' });
        this.accountTypeOption = this.page.getByRole('option', { name: '••••'});
        this.successMessage = "Transferencia enviada a ";

    }

    // Actions

    // Select account

    async completeAndSendMoney(email: string, amount: string) {

        await this.email.fill(email);
        await this.originAccountCombobox.click();
        await this.accountTypeOption.click();
        await this.amount.fill(amount);
        await this.sendBtn.click();
    }


}