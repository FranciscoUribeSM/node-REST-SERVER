//======================
// Verificar Token 
//======================

const jwt = require('jsonwebtoken');


let verificaToken = (req, res, next ) => {

        let token = req.get('token'); // Autorization 

        jwt.verify(token, process.env.SEED, (err, decoded) =>{

            if(err){
                return res.status(401).json({
                    ok:false,
                    err:{
                        message: 'Error de autenticacion '
                    }
                })
            }

            req.usuario = decoded.usuario; 

            next();
        })

     
};

//======================
// Verificar Admin Rol
//======================

let verificaAdmin_Role = (req, res, next ) => {

    let usuario = req.usuario; 

    if(usuario.role == 'ADMIN_ROLE'){
        next();
        
    }else{
        return res.json({
            ok:false,
            err:{
                message: 'El usuario no es ADministrador '
            }
        })

    }
};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}