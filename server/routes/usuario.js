const express = require('express');

const _ = require('underscore');

const Usuario = require('../models/usuario');


const app = express();




app.get('/user', (req, res) => {


    
    let sort = req.query.sort || 'name';

    

    Usuario.find()
        .sort(sort)
        .exec((err, usuarios) => {
            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                usuarios
            });



        });
});

app.get('/user/:id', (req,res) => {

    let id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {

          return res.status(400).json({
                    ok: false,
                    err
                });
            }


            res.json({
                usuarioDB
            });
    })

})


app.post('/user', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        lastName: body.lastName,
        age: body.age,
        sport: body.sport
    });

    usuario.save((err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    
});

app.put('/user/:id',  (req, res)=> {

    let id = req.params.id;
    let body = req.body;

     Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    })

});

app.delete('/user/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});



module.exports = app;