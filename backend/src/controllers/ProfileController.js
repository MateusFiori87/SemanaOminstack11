const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

        if (incident.length == 0)
            return response.status(401).json({ error: "Não encontrou nenhum incident para essa ong" });

        return response.json(incident);
    }
}