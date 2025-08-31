import { Page, Locator } from "@playwright/test";

export class DashboardPage {

    readonly page: Page;
    readonly createAccountBtn: Locator;
    readonly plusBtn: Locator;
    readonly deleteBtn: Locator;
    readonly addFundsBtn: Locator;
    readonly sendBtn: Locator;
    readonly logOutBtn: Locator;

    constructor(page: Page) {

        this.page = page;
        this.createAccountBtn = this.page.getByTestId('tarjeta-agregar-cuenta');
        
        /*this.deleteBtn = page.getByTestId('boton-eliminar-cuenta');
        this.addFundsBtn = page.getByTestId('boton-agregar-fondos');
        this.sendBtn = page.getByTestId('boton-enviar');
        this.logOutBtn = page.getByTestId('boton-logout');*/
    }

    // Actions

    async visitDashboardUrl() {

        await this.page.goto("http://localhost:3000/dashboard");
        await this.page.waitForLoadState("domcontentloaded");

    }

    /*
        async clickPlusBtn() {
    
            await this.createAccountBtn.click();
    
        } */


}