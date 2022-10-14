const { async } = require('regenerator-runtime');
const { LoaderTargetPlugin } = require('webpack');
const User = require('../models/UserModel')

exports.index = (req , res) =>{
    res.render('register')
}

exports.postIndex = async (req , res) =>{
    try{

        const user = new User(req.body);
        await user.register()
    
        if(user.errors.length > 0){
            req.flash('errors' , user.errors)
            req.session.save( () => {
               return res.redirect('/cadastrar');
            });
            return;
        }
        
        req.flash('succes' , 'Seu usuário foi criado com sucesso.' );
        req.session.save( () => {
            return res.redirect('/cadastrar');
         });
        
    }catch(err){
        console.log(err)
        res.render('404')
    }
   

}