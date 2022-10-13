const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    email : { type: String, required : true },
    password : { type: String, required : true }
});

const UserModel = mongoose.model('User' , UserSchema );

class User {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.validate();
        if(this.errors.length > 0) return;
        try{
            this.user = await UserModel.create(this.body);
        }catch(err){
            console.log(err)
        }
    }

    validate(){
        this.cleanUp()
        if( !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if( this.body.password.length < 3 || this.body.password.length >= 50 ) this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
    }
    
    cleanUp(){

        for( let key in this.body  ){
           if( typeof this.body[key] !== 'string' ){
                this.body[key] = '';
           }
        }

        this.body = {
            email: this.body.email ,
            password : this.body.password
        };

    }

}

module.exports = User;