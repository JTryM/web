const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});
/**Para no esperar a que termine el servidor se indica en la funcion de post que hay procesos asyncronos con palabra clave: "async"*/
router.post('/notes/new-notes', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please Write a Title' });
    }
    if (!description) {
        errors.push({ text: 'Please Write a Description' });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else {
        const newNote = new Note({ title, description })
        /*operacion de mongo DB peticion asincrona, palabra clave: "await"*/
        await newNote.save();
        req.flash('success_msg', 'Note Added Succesfully');
        res.redirect('/notes');
    }
});
router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({ date: 'desc' });
    res.render('notes/all-notes', { notes });
});

/**Ruta para editar la nota */
router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });
});
/**Ruta para editar la nota */
router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    /**metodo ajax */
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note update succesfully');
    res.redirect('/notes');
});
router.delete('/note/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted succesfully');
    res.redirect('/notes')
});
module.exports = router;
