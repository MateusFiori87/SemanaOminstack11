const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "NT",
                email: "contato@email.com.br",
                whatsapp: "18996113534",
                city: "Adamantina",
                uf: "SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})