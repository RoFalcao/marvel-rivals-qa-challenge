import { test, expect } from '@playwright/test';

test.describe('Marvel Developer API', () => {

    test('API-01 - deve consultar usuário autenticado com sucesso', async ({ request }) => {
        const response = await request.post(process.env.MARVEL_API_BASE_URL!, {
            headers: {
                Authorization: `Bearer ${process.env.MARVEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                query: `
                    query getUser {
                        user {
                            pk
                            username
                        }
                    }
                `,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data).toBeDefined();
        expect(body.data.user).toBeDefined();
    });

    test('API-02 - deve validar a estrutura da resposta do usuário', async ({ request }) => {
        const response = await request.post(process.env.MARVEL_API_BASE_URL!, {
            headers: {
                Authorization: `Bearer ${process.env.MARVEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                query: `
                    query getUser {
                        user {
                            pk
                            username
                        }
                    }
                `,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('user');
        expect(body.data.user).toHaveProperty('pk');
        expect(body.data.user).toHaveProperty('username');

        expect(body.data.user.pk).toBeDefined();
        expect(typeof body.data.user.username).toBe('string');
    });

});