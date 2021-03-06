require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 

const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// habilitar carpeta public 
app.use( express.static(path.resolve(__dirname , '../public')))

// configuracion local de rutas
app.use(require('./routes/index'));

var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    useNewUrlParser: true
  };


mongoose.connect( process.env.URLDB ,{useNewUrlParser: true})
    .then(() => {
        console.log('BD conectada')
    })

app.listen(process.env.PORT, () => {

    console.log(`Escuchando puerto ${process.env.PORT}`);
});

