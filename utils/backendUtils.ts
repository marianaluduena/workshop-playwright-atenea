import { Page, Locator, request, expect } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";

export class BackendUtils {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
/*
    async sendSignUpRequest(endpoint: string, data: any) {
        const apiRequestContext = await request.newContext();

        const response = await apiRequestContext.post(endpoint, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                'Content-Type': "application/json",
            },
            data: data
        });

        const responseBody = await response.json();

        await apiRequestContext.dispose();

        return { response, responseBody };
    }*/

     static async crearUsuarioPorAPI(request: APIRequestContext, user: any) {
        const email = (user.email.split('@'))[0] + Math.floor(Math.random() * 1000) + '@' + user.email.split('@')[1];
        const response = await request.post('http://localhost:6007/api/auth/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                firstName: user.name,
                lastName: user.lastName,
                email: email,
                password: user.password
            }
        })
        expect(response.status()).toBe(201);
        return { email: email, contrasena: user.contrasena }
    }

}




