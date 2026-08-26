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

    test('API-03 - deve retornar erro ao realizar requisição sem query GraphQL', async ({ request }) => {
        const response = await request.post(process.env.MARVEL_API_BASE_URL!, {
            headers: {
                Authorization: `Bearer ${process.env.MARVEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {},
        });

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.errors).toBeDefined();
        expect(body.errors[0].message).toBe('Must provide query string.');
    });

    test('API-04 - deve restringir acesso ao schema autenticado quando não houver autenticação', async ({ request }) => {
        const response = await request.post(process.env.MARVEL_API_BASE_URL!, {
            headers: {
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

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.info).toBeDefined();
        expect(body.info[0].message).toContain('unauthenticated');

        expect(body.errors).toBeDefined();
        expect(body.errors[0].message).toContain(
            'Cannot query field "user" on type "PublicQueries"'
        );
    });

    test('API-05 - deve rejeitar requisição com token inválido', async ({ request }) => {
        const response = await request.post(process.env.MARVEL_API_BASE_URL!, {
            headers: {
                Authorization: 'Bearer invalid-token',
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

        expect(response.status()).toBe(401);

        const body = await response.json();

        expect(body.errors).toBeDefined();
        expect(body.errors[0].message).toBe('OAuth2 token expired or invalid');
    });

});