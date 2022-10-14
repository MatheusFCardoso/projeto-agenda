const { async } = require('regenerator-runtime')
const User = require('../models/UserModel')

exports.index = (req , res) =>{
    res.render('login')
}

exports.login = async (req , res) =>{
    try{
        const user = new User(req.body);
        await user.login()
    
        if(user.errors.length > 0){
            req.flash('errors' , user.errors)
            req.session.save( () => {
               return res.redirect('/login');
            });
            return;
        }

        req.flash('succes' , 'Você logou no sistema.' );
        req.session.user = user.user
        req.session.save( () => {
            return res.redirect('/login');
         });
        
    }catch(err){
        console.log(err)
        res.render('404')
    }
}

exports.logout = ( req , res ) =>{
    req.session.destroy()
    res.redirect('/')
}