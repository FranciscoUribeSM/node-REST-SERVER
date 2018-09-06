/**
 * Puerto
 */

process.env.PORT =  process.env.PORT || 3000; 

/**
 * ENTORNO
 */

process.env.NODE_ENV =  process.env.PORNODE_ENVT || 'dev';

/**
 * Base dedatos
 */

 let urlDB; 

//  if(process.env.NODE_ENV  =='dev'){
//      urlDB='mongodb://localhost:27017/cafe';
//  }else{
    urlDB='mongodb://cafe-user:1234asdASD@ds247852.mlab.com:47852/cafe';
//  }

 process.env.URLDB = urlDB; 