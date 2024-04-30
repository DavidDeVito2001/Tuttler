const express = require('express');
const mongoose = require('mongoose');
const lugarRoute = require('./routes/lugar.route.js');
const app = express()


//Middleware
app.use(express.json());
//para poder enviar los datos en campos de formulario
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/lugares', lugarRoute);

app.get('/',(req, res) => {
    res.send("<h1>hello</h1>")
});

// despues del .net slash va el nombre de la coleccion                     
mongoose.connect('mongodb+srv://daviddevito01:ezedv211201@cluster0.lqd9ufj.mongodb.net/lugares?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {console.log('Connected!');
app.listen(3000, () => {
    console.log("port 3000")
});})
.catch(()=>{
    console.log("fallo la conexón")
});