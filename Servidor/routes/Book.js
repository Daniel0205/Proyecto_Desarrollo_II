const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db  =require('../config/database')
const Book = require('../models/Book')
const Inventory = require('../models/Inventory')


/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS PRODUCTOS////////////////
/////////////////////////////////////////////////////

//Insertar productos en la base de datos
router.post("/insert", function(req,res){

    delete req.body.tipo;
    delete req.body.source;
    let path = '';
    let EDFile = null;

    if (Object.keys(req.files.EDFile).length != 0) {
              
        EDFile = req.files.EDFile;
        path = `./images/${EDFile.name}`;
        imgRoute = `images/${EDFile.name}`
        req.body.imagepath = imgRoute;
    }
    

    Book.create(req.body)
    .then(x => {
        if(EDFile != null){
            EDFile.mv(path, function(err) {
                if (err){
                    return res.status(500).send(err);
                }else{
                    console.log('File uploaded!');
                }
            });
        }

        res.json([{bool:true}]);
    })
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
  
})

//Consultar productos de la base de datos
router.post('/getAll', function(req,res){

    Book.findAll({
        where: {active:true},
        include: [{model:Inventory,where:{name_dp:req.body.dp}}]
    })
    .then(x => res.json({bool:true,book:x}))
    .catch(err => {
        console.log(err)
        res.json({ bool: false })
    });
})

//Modificar los datos de un producto especifico de la base de datos
router.post("/update", function(req,res){

    delete req.body.tipo;
    delete req.body.source;
    let path = '';
    let EDFile = null;

    if(req.files!==null){
        if (Object.keys(req.files.EDFile).length != 0) {
                
            EDFile = req.files.EDFile;
            path = `./images/${EDFile.name}`;
            imgRoute = `images/${EDFile.name}`
            req.body.imagepath = imgRoute;
        }
    }
    

    let index = req.body.isbn;
    delete req.body.isbn

    Book.update(req.body,{where: {
        isbn: index
    }})
    .then(x => {
        if(EDFile != null){
            EDFile.mv(path, function(err) {
                if (err){
                    return res.status(500).send(err);
                }else{
                    console.log('File uploaded!');
                }
            });
        }

        res.json([{bool:true}]);
    })
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
})

//Eliminar un producto especifico de la base de datos
router.delete('/delete', function(req,res){


    Book.update({active:false},{where: {
        isbn: req.body.isbn
    }}).then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });

})

module.exports =router;