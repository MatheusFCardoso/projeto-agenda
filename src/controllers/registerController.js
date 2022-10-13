const { async } = require('regenerator-runtime');
const { LoaderTargetPlugin } = require('webpack');
const User = require('../models/UserModel')

exports.index = (req , res) =>{
    res.render('register')
}

exports.postIndex = async (req , res) =>{
    const user = new User(req.body);
    await user.register()

    if(user.errors.length > 0){
        req.flash('errors' , user.errors)
        req.session.save(()=> {
            res.redirect('back');
        });
        return;
    }

    res.send(user.errors);
}