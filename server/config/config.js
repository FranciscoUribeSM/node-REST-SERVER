/**
 * Puerto
 */

process.env.PORT =  process.env.PORT || 3000; 

/**
 * ENTORNO
 */

process.env.NODE_ENV =  process.env.PORNODE_ENVT || 'dev';

/**
 * Vencimiento del token
 */

 process.env.CADUCIDAD_TOKEN = '48h';

/**
 * Semilla de expiracion
 */

 process.env.SEED = process.env.SEED || 'secret' 

/**
 * Base dedatos
 */

 let urlDB; 

 if(process.env.NODE_ENV  =='dev'){
     urlDB='mongodb://localhost:27017/cafe';
 }else{
    urlDB='mongodb://cafe-user:1234asdASD@ds247852.mlab.com:47852/cafe';
 }

 process.env.URLDB = urlDB; 

/**
 * Google Client ID
 */

 process.env.CLIENT_ID =process.env.CLIENT_ID || '273551881894-4cbnh79iisn190u4gu6k71bef8mq12ph.apps.googleusercontent.com';