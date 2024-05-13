var express = require('express');
const CategoryModel = require('../model/category');
const WorkerModel = require('../model/worker');
var router = express.Router();

/* GET home page. */
/*router.get('/categorydisplay', function(req, res, next) {
 res.render('category/categorydisplay')
});*/
router.get('/workeradd', function(req, res, next) {
    res.render('worker/workeradd')
   });
  
   router.post('/workerprocess', function(req, res, next) {
   var filename = req.files.image.name;
    var mydata = {
    workername:req.body.name,
    workerdetails:req.body.detail,
    workersalary:req.body.salary,
    workercategory:req.body.category,
    workerexperience:req.body.experience,
    workernumber:req.body.number,
    workeraddress:req.body.address,
    workerimage : filename,
    workeremail :req.body.email,
    workerpassword :req.body.password

 
   
   }
   var myfile = req.files.image;
   
   WorkerModel.create(mydata)
   .then(() => console.log("Recorded added"))
   .catch ((err) => console.log(err));
   myfile.mv("public/uploads/" +filename,function(err){
   res.redirect('workerdisplay')
})
  // res.send("Recorded added")
   });
   router.get('/workerdisplay', function(req, res, next) {
    WorkerModel.find()
    .then(data => {
        console.log(data);
        res.render('worker/workerdisplay',{mydata:data});
    })
    .catch(err => console.log(err))
   });

   router.get('/workeredit', function(req, res, next) {
    res.render('worker/workeredit')
   });
   //delete
   router.get('/delete/:id',function(req,res,next){
    var id = req.params.id;
    WorkerModel.findByIdAndDelete(id)
    .then(data => {
        res.redirect('/worker/workerdisplay')
    })
    .catch(err =>console.log(err))
   });

   //edit
   router.get('/edit/:id', function (req, res) {
    console.log(req.params.id);
    WorkerModel.findById(req.params.id).then(function (db_users_array) {
    //  console.log(db_users_array);
      res.render('worker/workeredit', { user_array : db_users_array });
    });
  });
  
  //Update Record Using Post Method
  router.post('/edit/:id', function (req, res) {
   // console.log("Edit ID is" + req.params.id);
    const mybodydata = {
    workername:req.body.name,
    workerdetails:req.body.detail,
    workersalary:req.body.salary,
    workercategory:req.body.category,
    workerexperience:req.body.experience,
    workeraddress:req.body.address,
    workernumber:req.body.number,
    workeremail :req.body.email,
    workerpassword :req.body.password
    // workerimage : filename,
     
    }
    WorkerModel.findByIdAndUpdate(req.params.id, mybodydata).then(function (db_users_array) {
       console.log(db_users_array);
       res.redirect('/worker/workerdisplay');
      });
      
    });
  

  //Get Single User By ID
router.get('/show/:id', function (req, res) {
  console.log(req.params.id);
  WorkerModel.findById(req.params.id).then(function (db_users_array) {
    console.log(db_users_array);
    res.render('worker/workershow', { user_array: db_users_array });
  });
});

  router.post('/workerregister', function(req, res, next) {
    var filename = req.files.image.name;
     var mydata = {
     workername:req.body.name,
     workerdetails:req.body.detail,
     workersalary:req.body.salary,
     workercategory:req.body.category,
     workerexperience:req.body.experience,
     workernumber:req.body.number,
     workeraddress:req.body.address,
     workerimage : filename,
     workeremail :req.body.email,
     workerpassword :req.body.password
 
  
    
    }
    var myfile = req.files.image;
    
    WorkerModel.create(mydata)
    .then(() => console.log("Recorded added"))
    .catch ((err) => console.log(err));
    myfile.mv("public/uploads/" +filename,function(err){
    res.redirect('/workerside/workerlogin')
 })
   // res.send("Recorded added")
    });
   
  
module.exports = router;
