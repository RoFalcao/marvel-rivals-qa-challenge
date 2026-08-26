import { test, expect } from '@playwright/test';

test.describe('Resiliência', () => {

    test('TRV-03 - deve tratar timeout da requisição da API', async ({ request }) => {
        const apiRequest = request.post(process.env.MARVEL_API_BASE_URL!, {
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
            timeout: 1,
        });

        await expect(apiRequest).rejects.toThrow(/Timeout/i);
    });

    test('TRV-06 - deve identificar indisponibilidade da API', async ({ request }) => {
        const unavailableApiRequest = request.post(
            'http://127.0.0.1:1/graphql/',
            {
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
                timeout: 3000,
            }
        );

        await expect(unavailableApiRequest).rejects.toThrow();
    });

});