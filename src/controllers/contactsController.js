const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel')

exports.index = (req , res ) => {
    return res.render('contacts-form' , {contactId : ""})
}

exports.postIndex = async (req , res ) => {

    try{

        const contact = new Contact(req.body);
        await contact.register();
    
        if(contact.errors.length > 0){
            req.flash('errors' , contact.errors );
            req.session.save(()=> res.redirect('/contato'));
            return;
        }
    
        req.flash('succes' , 'Contato registrado com sucesso.' );
        req.session.save(()=> res.redirect(`/contato/edit/${contact.contact._id}`));
    
        return;

    }catch(err){
        console.log(err)
        res.render('404')
    }


}

exports.edit = async (req , res ) => {
    if(!req.params.id) return res.render('404');
    const contactId = await Contact.findById(req.params.id);
    if(!contactId) return res.render('404');
    res.render('contacts-form' , {contactId})
}

exports.postEdit = async (req , res) =>{

    try{
        if(!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);
    
        if(contact.errors.length  > 0){
            req.flash('errors' , contact.errors );
            req.session.save(()=> res.redirect(`/contato/edit/${req.params.id}`));
            return;
        }
    
        req.flash('succes' , 'Contato editado com sucesso.' );
        req.session.save(()=> res.redirect(`/contato/edit/${req.params.id}`));
    
        return;
    }catch(err){
        console.log(err);
        return res.render('404')
    }


}

exports.delete = async (req , res) =>{
    if(!req.params.id) return res.render('404');
    const contactId = await Contact.deleteById(req.params.id);
    if(!contactId) return res.render('404');
    req.flash('succes' , 'Contato apagado com sucesso.' );
    req.session.save(()=> res.redirect('/'));
    return;  
}