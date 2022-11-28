require("rootpath")();
const express = require('express');
const app = express();

const personaDb = require("personaDB.js");
const securityCont = require("security.js");

app.get('/',securityCont.verificarToken, getAll);

app.get('/:dni',securityCont.verificarToken, getByDni);

app.post('/',securityCont.verificarToken, create);

app.put('/:dni',securityCont.verificarToken, update);

app.delete('/:dni',securityCont.verificarToken, eliminar);


function getAll(req, res) {
    personaDb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function getByDni(req, res) {
    personaDb.getByDni(req.params.dni,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function create(req, res) {
    personaDb.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function update(req, res) {
    personaDb.update(req.params.dni, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
function eliminar(req, res) {
    personaDb.delete(req.params.dni, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}

module.exports = app;