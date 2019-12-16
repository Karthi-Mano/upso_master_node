var express = require('express')
var app = express()
const port = 2005;  

const bodyparser=require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())
let date = require('date');
var mysql = require('mysql');
var sql1=require('mysql');
var con = mysql.createConnection({
  host: "88.198.201.38",
  user: "admin_upsodriver",
  password: "admin_upsodriver",
  database: "admin_upsodriver"
});

con.connect((err)=>{
  if(!err)
    console.log('db connection suceeded ggggg');
       else 
     console.log('db connected failed \n error:'+JSON.stringify(err,undefined,2));
});



app.use(function (req, res, next) {

  // Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret,x-skyzip-mode, Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.post('/reg1',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO  `register1`(`driver_id`,`firstname`,`lastname`,`phone`,`email`,`password`,`conform`,`year`,`language`,`from_address`) VALUES   ('"+req.body.driver_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"','"+req.body.year+"','"+req.body.language+"','"+req.body.from_address+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})



app.put('/map1',(req,res)=>{
		console.log(req.body);
    var sql="UPDATE `acservice` SET `lat`='"+req.body.lat+"',`lng`='"+req.body.lng+"'  WHERE `service_id`='"+req.body.service_id+"'";
    console.log(sql);


    con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

//register1...otp///
app.put('/profile',(req,res)=>{
	console.log(req.body);

//  var sql = "INSERT INTO  `register1`(`driver_id`,`rating`,`trips`,`year`,`language`,`from_address`) VALUES  ('"+req.body.driver_id+"','"+req.body.rating+"','"+req.body.trips+"','"+req.body.year+"','"+req.body.language+"','"+req.body.from_address+"')";
  var sql="UPDATE `register1` SET `rating`='"+req.body.rating+"',`year`='"+req.body.year+"',`language`='"+req.body.language+"',`from_address`='"+req.body.from_address+"',`trips`='"+req.body.trips+"'  WHERE `driver_id`='"+req.body.driver_id+"'";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})
app.put('/getreg',(req,res)=>{
  //var sql="SELECT * FROM `acservice`"
  var sql="SELECT * FROM `register1` where email = '"+req.body.email+"'"
 //var sql="SELECT * FROM `official_details` where driver_id = '"+req.body.driver_id+"'"

// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

app.put('/getreg2',(req,res)=>{
  //var sql="SELECT * FROM `acservice`"
  var sql="SELECT * FROM `register1` where driver_id = '"+req.body.driver_id+"'"
 //var sql="SELECT * FROM `official_details` where driver_id = '"+req.body.driver_id+"'"

// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.put('/official_details',(req,res)=>{
  //var sql="SELECT * FROM `acservice`"
 // var sql="SELECT * FROM `register1` where email = '"+req.body.email+"'"
 var sql="SELECT * FROM `official_details` where driver_id = '"+req.body.driver_id+"'"

// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})

app.post('/rating',(req,res)=>{
	console.log(req.body);
  var sql = "INSERT INTO  `profile`(`driver_id`,`time`,`date`,`trips`,`earning`) VALUES   ('"+req.body.driver_id+"','"+req.body.time+"','"+req.body.date+"','"+req.body.trips+"','"+req.body.earning+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})
app.put('/get_rating',(req,res)=>{
  //var sql="SELECT * FROM `acservice`"
  var sql="SELECT * FROM `rating` where driver_id = '"+req.body.driver_id+"'"
// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(err);
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})







 //Ac Service///



 //Select Table//
  app.put('/official',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `official_details` where driver_id = '"+req.body.driver_id+"'"
 // var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("created");
     con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  app.put('/count_completed1',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
     var sql="SELECT COUNT (status) FROM `official_details` where status = '"+req.body.status+"'"
 // var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
     console.log(sql);
      var success = { "status" : "success" };
      var failed = { "status" : "failed" };
  
      console.log("created");
      con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
  app.get('/count_apply',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
     var sql="SELECT COUNT (status) FROM `official_details` where status = '"+req.body.status+"'"
 // var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
     console.log(sql);
      var success = { "status" : "success" };
      var failed = { "status" : "failed" };
  
      console.log("created");
      con.query(sql,function(err,result){
      if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(err);
       }
       else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

        res.send(result);
      }
     });
  })
  
app.put('/report',(req,res)=>{
	
  console.log(req.body);
  //var fdate='11-05-2008';
  //var tdate='12-12-2017';
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  //var sql="SELECT * FROM `earnings` WHERE date='11-05-2008'";

var sql="SELECT * FROM `earnings` WHERE `date` BETWEEN  '"+req.body.fdate+"' AND '"+req.body.tdate+"' ";
//var sql="SELECT * FROM `earnings` WHERE `date` BETWEEN  '"+fdate+"' AND '"+tdate+"' ";

//var sql="SELECT id,dob,product,clientname,mobileno FROM bill WHERE dob >= '"+req.body.fdate+"' AND dob <= '"+req.body.tdate+"'";  
con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
      console.log(err);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
	  console.log(result);
    }
   });
})


/////////////////////////////////
app.get('/report1',(req,res)=>{
	
  console.log(req.body);

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  

var sql="SELECT * FROM `earnings` ";
//var sql="SELECT * FROM `earnings` WHERE `date` BETWEEN  '"+fdate+"' AND '"+tdate+"' ";

//var sql="SELECT id,dob,product,clientname,mobileno FROM bill WHERE dob >= '"+req.body.fdate+"' AND dob <= '"+req.body.tdate+"'";  
con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
      console.log(err);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
	  console.log(result);
    }
   });
})

////////////////////////////////

/////////////////////////////////
app.put('/report2',(req,res)=>{
	
  console.log(req.body);
  //var fdate='11-05-2008';
  //var tdate='12-12-2017';
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  //var sql="SELECT * FROM `earnings` WHERE date='11-05-2008'";

var sql="SELECT * FROM `earnings` WHERE driver_id='"+req.body.driver_id+"' ";
//var sql="SELECT * FROM `earnings` WHERE `date` BETWEEN  '"+fdate+"' AND '"+tdate+"' ";

//var sql="SELECT id,dob,product,clientname,mobileno FROM bill WHERE dob >= '"+req.body.fdate+"' AND dob <= '"+req.body.tdate+"'";  
con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
      console.log(err);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
	  console.log(result);
    }
   });
})
app.put('/edit_account',(req,res)=>{
	console.log(req.body);

//  var sql = "INSERT INTO  `register1`(`driver_id`,`rating`,`trips`,`year`,`language`,`from_address`) VALUES  ('"+req.body.driver_id+"','"+req.body.rating+"','"+req.body.trips+"','"+req.body.year+"','"+req.body.language+"','"+req.body.from_address+"')";
  var sql="UPDATE `register1` SET `firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`phone`='"+req.body.phone+"',`email`='"+req.body.email+"',`password`='"+req.body.password+"',`address`='"+req.body.address+"'  WHERE `driver_id`='"+req.body.driver_id+"'";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
     }
     else{
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})




console.log("Working Fine!");
app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
//-----------------//------------------//