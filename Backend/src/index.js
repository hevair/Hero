const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Rota

/*
    Tipos de paramentos 

    query params
    Route Params

*/


app.listen(3333,function(){
    console.log('Servidor Rodando')
})