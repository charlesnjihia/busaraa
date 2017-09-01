var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
var PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },    
    roles:[String],
    requirements:[String],
    created_at: { type: Date, default: Date.now },
    owner:String
});

// hash password before saving to database
//jump this stage for now as bcrypt isnt responding
/*UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});*/
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
