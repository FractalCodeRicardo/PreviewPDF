
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const express = require('express')

const path = require('path');
const fs = require('fs');
const app = express()

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/archivo', function(req, res){
    let archivo = req.files.archivo;
    return guardarArchivo(archivo, function(respuesta){

        res.send(respuesta);
    });
});


app.get('/archivo', function(req, res){
    obtenerArchivos(function(respuesta){
        res.send(respuesta);
    })
})

function guardarArchivo(archivo, callback) {
    archivo.mv(__dirname + '/archivos/' + archivo.name, function (err) {
        if (err)
            return callback({ exito: false, description: err });

        callback({ exito: true, description: err })
    });
}

function obtenerArchivos(callback) {
    const directorio = path.join(__dirname, 'archivos');
    let archivos = [];
    fs.readdir(directorio, function (err, archivos) {
        if (err) {
            return callback({exito: false})
        }
        
        return callback({exito:true, archivos: archivos});
    });
}
 
app.listen(3000)
