const express = require('express');
const router=express.Router();
router.get('/user/singin',(req,res)=>{
    res.send('Ingresando a la app');
});
router.get('/user/singup',(req,res)=>{
    res.send('Formulario de autenticacion');
});
module.exports=router;
