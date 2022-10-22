const Contact = require('../models/ContactModel')

exports.index = async(req , res ) => {
    if(!req.session.user){ 
        return  res.render('index');
    }else{
        const contacts = await Contact.findContacts(req.session.user._id)
        return res.render('user-index' , {contacts} );
    }
}
