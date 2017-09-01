var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
var ApplicationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
     type: String,
     required: true,
     trim: true
    },
    letter:{
     type: String,
     required: true,
     trim: true   
    },
    education:{school:String,field:String,grade:String,from_date:String,to_date:String},
    experience:{company:String,industry:String,title:String,from_date:String,to_date:String},
    date_applied: { type: Date, default: Date.now },
    post_id:String
});


var Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
