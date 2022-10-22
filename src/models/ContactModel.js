const mongoose = require('mongoose');
const validator = require('validator');


const ContactSchema = new mongoose.Schema({
    name : { type: String, required : true },
    lastName : { type: String, required : false , default : '' },
    email : { type: String, required : false , default : '' },
    telephone : { type: String, required : false ,  },
    created : { type: Date, default : Date.now },
    createdBy : { type: String, required : false , default : '' }

});

const ContactModel = mongoose.model('Contact' , ContactSchema );

class Contact {

    constructor(body){
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register(){
        this.validate();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body)
    }

    validate(){
        this.cleanUp()
        if( this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if( !this.body.name ) this.errors.push('Nome é um campo obrigatório');
        if( !this.body.email && !this.body.telephone ) {
            this.errors.push('Pelo menos um contato precisa ser enviador : e-mail ou telefone');
        }
    }
    
    cleanUp(){

        for( let key in this.body  ){
           if( typeof this.body[key] !== 'string' ){
                this.body[key] = '';
           }
        }

        this.body = {
            email: this.body.email ,
            name : this.body.name , 
            lastName : this.body.lastName ,
            telephone : this.body.telephone,
            createdBy : this.body.createdBy
        };

    }

    async edit(id){
        if(typeof id !== 'string') return;
        this.validate()
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id , this.body , {new : true});
    }

    static async findById(id){
        if(typeof id !== 'string' ) return;
        const contact = await ContactModel.findById(id);
        return contact;
    }

    static async findContacts(userId){
        const contacts = await ContactModel.find({ createdBy: userId })
        return contacts;    
    }

    static async deleteById(id){
        if(typeof id !== 'string') return;
        const contact = await ContactModel.findOneAndDelete({ _id : id});
        return contact;
    }

}

module.exports = Contact;