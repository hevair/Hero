const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(req, res){

        const {page = 1} = req.query;

        const [count] = await connection('incidentes')
        .count()

        const incidents = await connection('incidentes')
        .join('ongs', 'ongs.id', '=', 'incidentes.ong_id')
        .limit(5)
        .offset((page - 1) * 5 )
        .select(['incidentes.*',
                'ongs.name', 
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async create(req,res){
        const {title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        console.log(req.bady)
       const [id] =  await connection('incidentes').insert({
            title,
            description,
            value,
            ong_id,
        })

        return res.json({id});

    },

    async delete(req, res){
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidentes')
        .select('ong_id')
        .where('id', id)
        .first();

        if(incident.ong_id != ong_id){
            return res.status(401).json({error:'operation not permitted'});
        }

        await connection('incidentes').where('id', id).delete();

        return res.status(204).send();

    }

}