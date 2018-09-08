

const express = require('express');
let {verificaToken,verificaAdmin_Role} = require('../middlewares/autentificacion');

let app = express();

let Categoria = require('../models/categoria');

// ============================
// Mostrar todas las categorias
// ============================
app.get('/categoria',verificaToken,  (req,res) => {
 
    Categoria.find({})
            .sort('descripcion')
            .populate('usuario')
            .exec( (err, categorias) => {
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    })
                }
                res.json({
                    ok: true, 
                    categorias
                  
                })
            
            })
});

// ============================
// Mostrar categoria por ID
// ============================
app.get('/categoria/:id', (req,res) => {
    // Categoria.findById()
    let id = req.params.id;
    Categoria.findById(id)
    .exec( (err, categorias) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok: true, 
            categorias
        })
    })
});

// ============================
// Crear nueva categoria
// ============================
app.post('/categoria', verificaToken, (req, res)=> {
    // regresa la nueva categoria
    // req.usuaio._id -> de verificar token
    console.log('entro')

    let body = req.body;
    let usuario = req.usuario;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario
    })

        categoria.save((err, categoriaDB) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            if(!categoriaDB){
                return res.status(400).json({
                    ok:false,
                    err:{
                        menssage:'No categoria'
                    }
                })
            }
            res.json({
                ok: true,
                usuario: categoriaDB
            });
        })

});

// ============================
// Actualizar usuario
// ============================
app.put('/categoria/:id', verificaToken, (req,res) =>{
     // actualizar solo descripcion de la categoria

     let id = req.params.id;
     let body = req.body;
 
    let descCategoria = {
        descripcion: body.descripcion
    }
     // delete body.password;
     // delete body.google;
 
     Categoria.findByIdAndUpdate(id, descCategoria, {new:true, runValidator:true }, (err,categoriaDB) => {
 
         if(err){
             return res.status(400).json({
                 ok:false,
                 err
             })
         }
         if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    menssage:'El ID de la categoria no'
                }
            })
        }
 
         res.json({
             ok: true,
             categoria:categoriaDB
         });
     })
})

// ============================
// Actualizar usuario
// ============================
app.delete('/categoria/:id', [verificaToken,verificaAdmin_Role], (req,res) =>{
    // solo la puede borrar un administrador
    // tiene que pedir el token 
    // CategoriaFindByIdAndRemove
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok: true,
            categoria:categoriaDB
        });

    })
})



module.exports = app; 