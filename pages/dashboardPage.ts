import { Page, Locator } from "@playwright/test";

export class DashboardPage {

    readonly page: Page;
    readonly addAccountBtn: Locator;
    readonly deleteBtn: Locator;
    readonly addFundsBtn: Locator;
    readonly sendBtn: Locator;
    readonly logOutBtn: Locator;
    readonly mainTitle: Locator;
    readonly selectAccount: Locator;

    constructor(page: Page) {

        this.page = page;
        this.addAccountBtn = this.page.getByTestId('tarjeta-agregar-cuenta');
        this.deleteBtn = page.getByTestId('boton-eliminar-cuenta');
        this.addFundsBtn = page.getByTestId('boton-agregar-fondos');
        this.sendBtn = page.getByTestId('boton-enviar');
        this.logOutBtn = page.getByTestId('boton-logout');
        this.mainTitle = page.getByTestId('titulo-dashboard');
        this.selectAccount = page.getByRole('combobox', { name: 'Cuenta *' });
    }

    // Actions

    async visitDashboardUrl() {

        await this.page.goto("http://localhost:3000/dashboard");
        await this.page.waitForLoadState("domcontentloaded");

    }


}