
const express = require('express');
let app = express();

let {verificaToken,verificaAdmin_Role} = require('../middlewares/autentificacion');
let Producto = require('../models/producto');



//======================
//  Obtener todos los productos
//======================
app.get('/producto', verificaToken,  (req,res) => {
    
    //traer todos los productos
    //populate usuario y categoria 
    //paginado

    let desde = req.query.desde || 0; 
    desde= Number(desde); 

    let limite = req.query.limite || 5; 
    limite = Number(limite)

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec( (err, productosDB) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            res.json({
                ok: true, 
                productosDB
            
            })
        
        })
})

//======================
//  Obtener producto por id
//======================
app.get('/producto/:id', verificaToken , (req,res) => {
    //populate usuario y categoria 

    let id = req.params.id; 

    Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err,productoDB) => {
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }
                if(!productoDB){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            menssage: 'Id no existe'
                        }
                    })
                }
                res.json({
                    ok : true,
                    producto:productoDB
                })
            })
    
})

//======================
//  Buscar productos
//======================
app.get('/producto/buscar/:termino',verificaToken , (req,res) => {

    let termino = req.params.termino; 
    let regex = new RegExp(termino,  'i')
    
    Producto.find({ nombre:regex})
            .populate('categoria', 'descripcion')
            .exec((err,productos) => {
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            menssage:'Error de busqueda'
                        }
                    });
                }
                res.json({
                    ok : true,
                    producto:productos
                });
            });
})

//======================
//  Crear nuevo producto
//======================
app.post('/producto', verificaToken ,(req,res) => {
    //grabar el producto
    //grabar una categoria del listado
    
    let body = req.body;
    let usuario = req.usuario;
  
    let producto = new Producto({
        nombre:body.nombre,
        descripcion: body.descripcion,
        precioUni: body.precioUni,
        categoria: body.categoria,
        usuario: usuario._id
        
    })

        producto.save((err, productoDB) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            if(!productoDB){
                return res.status(400).json({
                    ok:false,
                    err:{
                        menssage:'No categoria'
                    }
                })
            }
            res.json({
                ok: true,
                usuario: productoDB
            });
        })
})


//======================
//  Actualizar producto
//======================
app.put('/producto/:id', verificaToken ,  (req,res) => {
    //
    let id = req.params.id; 
    let body = req.body; 

    Producto.findById(id,  (err,productoDB) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    menssage:'No categoria'
                }
            })
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;
        
        productoDB.save((err,productoGuardado) => {

            if(err){
                return res.status(500).json({
                    ok:false,
                    err:{
                        menssage:'No se puede guardar',
                        err
                    }
                })
            }

            res.json({
                ok: true,
                prducto: productoGuardado
            });
        })
    
    })
})

//======================
//  Borrar un producto
//======================
app.delete('/producto/:id',  verificaToken ,  (req,res) => {
    // disponnible = false;
    let id = req.params.id; 

    Producto.findById(id, (err,productoDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err:{
                    menssage:'No se puede guardar',
                    err
                }
            })
        }

        productoDB.disponible = false; 

        productoDB.save((err, productoBorrado) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err:{
                        menssage:'No se puede guardar',
                        err
                    }
                })
            }
            
            res.json({
                ok : true,
                productoBorrado
            })
        })

    })
})


//======================
//  Buscar producto por 
//======================
app.delete('/producto/:id',  verificaToken ,  (req,res) => {
    // disponnible = false;
    let id = req.params.id; 

    Producto.findById(id, (err,productoDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err:{
                    menssage:'No se puede guardar',
                    err
                }
            })
        }

        productoDB.disponible = false; 

        productoDB.save((err, productoBorrado) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err:{
                        menssage:'No se puede guardar',
                        err
                    }
                })
            }

            res.json({
                ok : true,
                productoBorrado
            })
        })
    })
})

module.exports = app;