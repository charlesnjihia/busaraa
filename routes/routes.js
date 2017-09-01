const express=require('express');
const router=express.Router();
const User=require('../models/user');
const Application=require('../models/application')
const Post=require('../models/post');
const mid=require('../middleware');

router.get('/',(req,res)=>{res.redirect('/posts');});


// GET /login
router.get('/login', function(req, res, next) {
 return res.render('login', { title: 'Log In' });
});

// POST /login
router.post('/login', function(req, res, next) {
  if(req.body.email && req.body.password){
     User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect('/posts');
      }
    });
     
  }else{
    var err=new Error('Email and Password are required');
    err.status=401;
    return next(err);
  }  
});
// GET /register
router.get('/register', function(req, res, next) {
 return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // create object with form input
      var userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };
         
     // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/posts');
        }
      });
      
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

// GET /newpost
router.get('/newpost',mid.requiresLogin, function(req, res, next) {
 return res.render('newpost', { title: 'Post Job' });
});
// POST /newpost
router.post('/newpost',mid.requiresLogin, function(req, res, next) {
   
   
     var roles_arr=req.body.roles.split('_')
     var reqs_arr=req.body.required.split('_')
   
   
    var newPost={
       title:req.body.title,
       description:req.body.description,
       roles:roles_arr,
       requirements:reqs_arr,
       owner: req.session.userId      
    };
    
    
      
   Post.create(newPost, function (error, post) {
        if (error) {
          var stat= error.status || 500;
          return res.json({error:error,status:stat});
        } else {
         // req.session.userId = user._id;
          res.status(200);
          return res.json({data:post,status:200});
        }
      });

});
// GET /newapplicant
router.get('/newapplicant', function(req, res, next) {
   var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var years=[];
   for (let i=1990;i<=2017;i++){
      years.push(i);
   }   
    
    
 return res.render('newapplication', { title: 'Apply ',months:months,years:years });
});
// POST /newapplication
router.post('/newapplication', function(req, res, next) {
   console.log(req.body);
   //create a new post 
    var newApp={
       name:req.body.name,
       email:req.body.email,
       phone:req.body.phone,
       letter:req.body.letter,
       education:
       { school:req.body.school,
          field:req.body.field,
          grade:req.body.grade,
          from_date:req.body.ed_from_month+' - '+req.body.ed_from_year,
          to_date:req.body.ed_to_month+' - '+req.body.ed_to_year      
        },
        experience:
        { company:req.body.company,
          industry:req.body.industry,
          title:req.body.title,
          from_date:req.body.exp_from_month+' - '+req.body.exp_from_year,
          to_date:req.body.exp_to_month+' - '+req.body.exp_to_year      
        },
        post_id:req.session.postId 
    }

Application.create(newApp, function (error, appl) {
        if (error) {
         
          return next(error);
        } else {
         
          res.status(200);
          return res.render('success',{message:'Application sent successfully'});
        }
      });    
    
 
});


// GET /allposts
router.get('/posts', function(req, res, next) {
    
    
  Post.find().sort({_id:-1}).exec( function (err, posts) {
              if (err) {
                return next(err);
              } else {
                 
				return res.render('posts', { title: 'All Jobs',posts:posts,userId:req.session.userId  });  
			  }
	});   
    
 
});
// GET /myposts
router.get('/myposts', function(req, res, next) {
    
    
  Post.find({owner:req.session.userId}).sort({_id:-1}).exec( function (err, posts) {
              if (err) {
                return next(err);
              } else {
                 
				return res.render('posts', { title: 'All Jobs',posts:posts,userId:req.session.userId  });  
			  }
	});   
    
 
});
// GET /post
router.get('/posts/:id', function(req, res, next) {
    let id=req.params.id;
    req.session.postId = id;
  Post.findOne({_id:id},function (err, post) {
              if (err) {
                return next(err);
              } else {
                
				return res.render('post', { title: 'Post',post:post,userId:req.session.userId  });  
			  }
	});   
      
    
    

});
// GET /posts/:id/applications
router.get('/posts/:id/applications', function(req, res, next) {
 let postId=req.params.id;
  
  Application.find({post_id:postId},{},function (err, applications) {
              if (err) {
                return next(err);
              } else {
                
				return res.render('applications', { title: 'Applications',apps:applications });  
			  }
	});   
      
});
// GET /applications/:id
router.get('/applications/:id', function(req, res, next) {
 let id=req.params.id;
  
  Application.findOne({_id:id},{},function (err, application) {
              if (err) {
                return next(err);
              } else {
                console.log(application) ;
				return res.render('application', { title: 'Applications',app:application });  
			  }
	});   
      
});





router.get('/logout', function(req, res, next) {
    if(req.session){
     //delete session
       req.session.destroy((err)=>{
         if(err){
          return next(err);
         }else{
          return res.redirect('/');    
         }                    
       })
}
});       
module.exports=router;