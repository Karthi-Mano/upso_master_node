var express = require('express')
var app = express()
const port = 3005;  


const bodyparser=require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())
let date = require('date');
var mysql = require('mysql');
var sql1=require('mysql');
var con = mysql.createConnection({
  host: "88.198.201.38",
  user: "admin_upsoadmin",
  password: "upsoadmin",
  database: "admin_upsoadmin"
});
//-----------------//
 
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
var success = { "status" : "success" };
  var failed = { "status" : "failed" };


app.put('/map',(req,res)=>{
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

//register...otp///
app.post('/reg',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO  `register`(`cus_id`,`firstname`,`lastname`,`phone`,`email`,`password`,`conform`) VALUES ('"+req.body.cus_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"')";
   console.log(sql)
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
//
app.put('/get_reg_phone',(req,res)=>{
  var sql="SELECT * FROM `register` where phone = '"+req.body.phone+"'"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(failed);
console.log(failed)
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
       console.log(result)
      res.send(result);
     
    }
   });
})



//email checking
app.put('/get_reg',(req,res)=>{
  var sql="SELECT * FROM `register` where email = '"+req.body.email+"'"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(failed);
console.log(failed)
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
       console.log(result)
      res.send(result);
     
    }
   });
})

 //Ac Service///
app.post('/ac1',(req,res)=>{
	
	console.log(req.body);
  

  var sql = "INSERT INTO `acservice`(`service_id`,`service`,`quantity`,`total) VALUES ('"+req.body.service_id+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total+"','"+req.body.date+"','"+req.body.time+"','"+req.body.day+"','"+req.body.status+"')";
console.log('inserted')
console.log(sql)
//console.log(service_id)

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
app.post('/service',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
console.log('inserted')
console.log(sql)

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
app.put('/get_password',(req,res)=>{
    var otpkey= Math.floor(1000 + Math.random() * 9000);

  var sql="UPDATE `acservice` SET `password`='"+req.body.password+"'  WHERE `email`='"+req.body.email+"'";

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
      con
      res.send(result);
    }
   });
})



 //Select Table//
  app.put('/getac',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `acservice` where service_id = '"+req.body.service_id+"'"
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
  app.put('/get_login',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `acservice` where email = '"+req.body.email+"'"
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
  
 
  // Update Table//
  app.put('/updateac',(req,res)=>{
    console.log('g')
   var sql="UPDATE `acservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
  // var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
 //                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                        
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
app.put('/upda2',(req,res)=>{
  console.log('g')
 var sql="UPDATE `acservice` SET `firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`phone`='"+req.body.phone+"',`email`='"+req.body.email+"',`password`='"+req.body.password+"',`conform`='"+req.body.conform+"' WHERE `service_id`='"+req.body.service_id+"'";
                                    //'"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"'                                                                                                                                                                                                                                                                                               
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

app.put('/upda',(req,res)=>{
  console.log('g')
 var sql="UPDATE `acservice` SET `date`='"+req.body.date+"',`day`='"+req.body.day+"',`time`='"+req.body.time+"',`bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/upda1',(req,res)=>{
  console.log('g')
 var sql="UPDATE `acservice` SET `service`='"+req.body.service+"',`quantity`='"+req.body.quantity+"',`total`='"+req.body.total+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/upda_cal',(req,res)=>{
  console.log('g')
 var sql="UPDATE `acservice` SET `date`='"+req.body.date+"',`day`='"+req.body.day+"',`time`='"+req.body.time+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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

// Delete Table//
  app.post('/deleteac',(req,res)=>{
   	  var sql="DELETE FROM `acservice` where service_id ='"+req.body.service_id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
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
//your cart->cost
app.post('/cost',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
console.log('inserted')
console.log(sql)

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
app.put('/get_log',(req,res)=>{
  var sql="SELECT * FROM `register` where email = '"+req.body.email2+"'"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.send(failed);
console.log(failed)
     }
     else{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
       console.log(result)
      res.send(result);
     
    }
   });
})
app.put('/get_log2',(req,res)=>{
  var sql="SELECT * FROM `register` where phone = '"+req.body.phone+"' "
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
// var sql="SELECT TOP 1 service,quantity FROM `acservice` ORDER BY id DESC"
console.log(sql);
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("created");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(failed);
    console.log(err);
    console.log(failed)
     }
     else{
      
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
     
      res.send(result);
      if(res=='[]')
      {
        console.log('no data')
      }
      else{
        console.log('data')
        console.log(result)
      }

   
    }
   });
})


//
//order confirmation
app.get('/getconfirmation',(req,res)=>{
  var sql="SELECT * FROM `acservice`"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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


//---------------------//------------------------//
///salonapp
//**************salon*************************** */


 //Ac Service///
 /*app.post('/salonreg',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO  `salonservice`(`service_id`,`firstname`,`lastname`,`phone`,`email`,`password`,`conform`) VALUES ('"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"')";

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
})*/


 app.post('/salonac1',(req,res)=>{
	
	console.log(req.body);
  

  var sql = "INSERT INTO `salonservice`(`service_id`,`service`,`quantity`,`total) VALUES ('"+req.body.service_id+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total+"','"+req.body.date+"','"+req.body.time+"','"+req.body.day+"','"+req.body.status+"')";
console.log('inserted')
console.log(sql)
//console.log(service_id)

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
app.post('/salonservice',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `salonservice`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
console.log('inserted')
console.log(sql)

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
app.put('/salonget_password',(req,res)=>{
    var otpkey= Math.floor(1000 + Math.random() * 9000);

  var sql="UPDATE `salonservice` SET `password`='"+req.body.password+"'  WHERE `email`='"+req.body.email+"'";

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



 //Select Table//
  app.put('/salongetac',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `cart1` where service_id = '"+req.body.service_id+"'"
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
  app.put('/salonget_login',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `salonservice` where email = '"+req.body.email+"'"
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
  
 
  // Update Table//
  app.put('/salonupdateac',(req,res)=>{
    console.log('g')
   var sql="UPDATE `salonservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
  // var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
 //                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                        
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

app.put('/salonupda2',(req,res)=>{
  console.log('g')
 var sql="UPDATE `salonservice` SET `firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`phone`='"+req.body.phone+"',`email`='"+req.body.email+"',`password`='"+req.body.password+"',`conform`='"+req.body.conform+"' WHERE `service_id`='"+req.body.service_id+"'";
                                    //'"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"'                                                                                                                                                                                                                                                                                               
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

app.put('/salonupda',(req,res)=>{
  console.log('g')
 var sql="UPDATE `salonservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/salonupda1',(req,res)=>{
  console.log('g')
  service_type="salon"
 //var sql="UPDATE `cart` SET `service_type`='"+service_type+"',`service`='"+req.body.service+"',`quantity`='"+req.body.quantity+"',`total`='"+req.body.total+"' WHERE `service_id`='"+req.body.service_id+"'";
 var sql = "INSERT INTO `cart1`(`cus_id`,`service_type`,`service`,`quantity`,`total`,`service_id`) VALUES  ('"+req.body.cus_id+"','"+service_type+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total	+"','"+req.body.service_id	+"')";
 //                                                                                                                                                                                                                                                                                                                      
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
app.put('/salonupda_cal',(req,res)=>{
  console.log('g')
 var sql="UPDATE `salonservice` SET `date`='"+req.body.date+"',`day`='"+req.body.day+"',`time`='"+req.body.time+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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

// Delete Table//
  app.post('/salondeleteac',(req,res)=>{
   	  var sql="DELETE FROM `salonservice` where service_id ='"+req.body.service_id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
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
app.put('/salonget_log',(req,res)=>{
  var sql="SELECT * FROM `salonservice` where email = '"+req.body.email2+"'"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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


//
//order confirmation
app.get('/salongetconfirmation',(req,res)=>{
  var sql="SELECT * FROM `salonservice`"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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
app.post('/saloncost',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `saloncost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
console.log('inserted')
console.log(sql)

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

//**************salon***************************** */

//***********carpentryapp *************************** */
/*app.post('/carpentryreg',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO  `carpentryservice`(`service_id`,`firstname`,`lastname`,`phone`,`email`,`password`,`conform`) VALUES ('"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"')";

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
})*/


 app.post('/carpentryac1',(req,res)=>{
	
	console.log(req.body);
  

  var sql = "INSERT INTO `carpentryservice`(`service_id`,`service`,`quantity`,`total) VALUES ('"+req.body.service_id+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total+"','"+req.body.date+"','"+req.body.time+"','"+req.body.day+"','"+req.body.status+"')";
console.log('inserted')
console.log(sql)
//console.log(service_id)

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
app.post('/carpentryservice',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `carpentryservice`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
console.log('inserted')
console.log(sql)

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
app.put('/carpentryget_password',(req,res)=>{
    var otpkey= Math.floor(1000 + Math.random() * 9000);

  var sql="UPDATE `salonservice` SET `password`='"+req.body.password+"'  WHERE `email`='"+req.body.email+"'";

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



 //Select Table//
  app.put('/carpentrygetac',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `carpentryservice` where service_id = '"+req.body.service_id+"'"
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
  app.put('/carpentryget_login',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `carpentryservice` where email = '"+req.body.email+"'"
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
  
 
  // Update Table//
  app.put('/carpentryupdateac',(req,res)=>{
    console.log('g')
   var sql="UPDATE `carpentryservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
  // var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
 //                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                        
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

app.put('/carpentryupda2',(req,res)=>{
  console.log('g')
 var sql="UPDATE `carpentryservice` SET `firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`phone`='"+req.body.phone+"',`email`='"+req.body.email+"',`password`='"+req.body.password+"',`conform`='"+req.body.conform+"' WHERE `service_id`='"+req.body.service_id+"'";
                                    //'"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"'                                                                                                                                                                                                                                                                                               
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

app.put('/carpentryupda',(req,res)=>{
  console.log('g')
 var sql="UPDATE `carpentryservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/carpentryupda1',(req,res)=>{
  console.log('g')
 var sql="UPDATE `carpentryservice` SET `service`='"+req.body.service+"',`quantity`='"+req.body.quantity+"',`total`='"+req.body.total+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/carpentryupda_cal',(req,res)=>{
  console.log('g')
 var sql="UPDATE `carpentryservice` SET `date`='"+req.body.date+"',`day`='"+req.body.day+"',`time`='"+req.body.time+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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

// Delete Table//
  app.post('/carpentrydeleteac',(req,res)=>{
   	  var sql="DELETE FROM `carpentryservice` where service_id ='"+req.body.service_id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
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
app.put('/carpentryget_log',(req,res)=>{
  var sql="SELECT * FROM `carpentryservice` where email = '"+req.body.email+"'"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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


//
//order confirmation
app.get('/carpentrygetconfirmation',(req,res)=>{
  var sql="SELECT * FROM `carpentryservice`"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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
app.post('/carpentrycost',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `carpentrycost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
console.log('inserted')
console.log(sql)

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







//*************carpentry ********************* */

//************cleaningapp ********************** */

/*app.post('/cleanreg',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO  `cleaningservice`(`service_id`,`firstname`,`lastname`,`phone`,`email`,`password`,`conform`) VALUES ('"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"')";

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
})*/


 app.post('/cleaningac1',(req,res)=>{
	
	console.log(req.body);
  

  var sql = "INSERT INTO `cleaningservice`(`service_id`,`service`,`quantity`,`total) VALUES ('"+req.body.service_id+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total+"','"+req.body.date+"','"+req.body.time+"','"+req.body.day+"','"+req.body.status+"')";
console.log('inserted')
console.log(sql)
//console.log(service_id)

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
app.post('/cleaningservice',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `cleaningservice`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
console.log('inserted')
console.log(sql)

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
app.put('/cleaningget_password',(req,res)=>{
    var otpkey= Math.floor(1000 + Math.random() * 9000);

  var sql="UPDATE `salonservice` SET `password`='"+req.body.password+"'  WHERE `email`='"+req.body.email+"'";

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



 //Select Table//
  app.put('/cleaninggetac',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `cleaningservice` where service_id = '"+req.body.service_id+"'"
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
  app.put('/get_login',(req,res)=>{
    //var sql="SELECT * FROM `acservice`"
    var sql="SELECT * FROM `cleaningservice` where email = '"+req.body.email+"'"
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
  
 
  // Update Table//
  app.put('/cleaningupdateac',(req,res)=>{
    console.log('g')
   var sql="UPDATE `cleaningservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
  // var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
 //                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                        
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

app.put('/cleaningupda2',(req,res)=>{
  console.log('g')
 var sql="UPDATE `cleaningservice` SET `firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`phone`='"+req.body.phone+"',`email`='"+req.body.email+"',`password`='"+req.body.password+"',`conform`='"+req.body.conform+"' WHERE `service_id`='"+req.body.service_id+"'";
                                    //'"+req.body.service_id+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.conform+"'                                                                                                                                                                                                                                                                                               
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

app.put('/cleaningupda',(req,res)=>{
  console.log('g')
 var sql="UPDATE `cleaningservice` SET `bedroom_cleaning`='"+req.body.bedroom_cleaning+"',`bedroom_qty`='"+req.body.bedroom_qty+"',`kitchen_cleaning`='"+req.body.kitchen_cleaning+"',`kitchen_qty`='"+req.body.kitchen_qty+"',`fabric_sofa`='"+req.body.fabric_sofa+"',`fabric_qty`='"+req.body.fabric_qty+"',`service_cost`='"+req.body.service_cost+"',`center_gst`='"+req.body.center_gst+"',`state_gst`='"+req.body.state_gst+"',`tot`='"+req.body.tot+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/cleaningupda1',(req,res)=>{
  console.log('g')
 var sql="UPDATE `cleaningservice` SET `service`='"+req.body.service+"',`quantity`='"+req.body.quantity+"',`total`='"+req.body.total+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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
app.put('/cleaningupda_cal',(req,res)=>{
  console.log('g')
 var sql="UPDATE `cleaningservice` SET `date`='"+req.body.date+"',`day`='"+req.body.day+"',`time`='"+req.body.time+"' WHERE `service_id`='"+req.body.service_id+"'";
                                                                                                                                                                                                                                                                                                                      
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

// Delete Table//
  app.post('/cleaningdeleteac',(req,res)=>{
   	  var sql="DELETE FROM `cleaningservice` where service_id ='"+req.body.service_id+ "'"

   var success = { "status" : "success" };
   var failed = { "status" : "failed" };
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
app.put('/cleaningget_log',(req,res)=>{
  var sql="SELECT * FROM `cleaningservice` where email = '"+req.body.email+"'"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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


//
//order confirmation
app.get('/cleaninggetconfirmation',(req,res)=>{
  var sql="SELECT * FROM `cleaningservice`"
  //var sql="SELECT * FROM `register` where id = '"+req.body.id+"'"
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
app.post('/cleaningcost',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `cleaningcost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
console.log('inserted')
console.log(sql)

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



app.post('/cart',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `cart1`(`cus_id`,`service_id`,`service`,`service_type`,`quantity`,`total`) VALUES ('"+req.body.cus_id+"','"+req.body.service_id+"','"+req.body.service1+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total+"')";
console.log('inserted')
console.log(sql)

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
	  console.log(err);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

  app.post('/pestservice',(req,res)=>{
    console.log('g')
   var sql="INSERT INTO `pestservice` (`service_id`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.service_id+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning+"','"+req.body.kitchen_qty+"','"+req.body.fabric_sofa+"','"+req.body.fabric_qty+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"' )";
  // var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
 //                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                        
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
 app.put('/pestservice1',(req,res)=>{
    console.log('g')
   var sql="Select * from `pestservice` where `service_id`='"+req.body.service_id+"'"; 
  // var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
 //                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                        
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
app.post('/cart1',(req,res)=>{
	
	console.log(req.body);

  var sql = "INSERT INTO `cart1`(`cus_id`,`service_id`,`service`,`service_type`,`quantity`,`total`,`type`) VALUES ('"+req.body.cus_id+"','"+req.body.service_id+"','"+req.body.service_type+"','"+req.body.service+"','"+req.body.quantity+"','"+req.body.total+"','"+req.body.type+"')";
console.log('inserted')
console.log(sql)

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
	  console.log(err);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

app.get('/cart2',(req,res)=>{
	
	console.log(req.body);

  var sql = "SELECT * FROM `cart1`";
console.log('inserted')
console.log(sql)

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(err);
	  console.log(err);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})
app.put('/account',(req,res)=>{
  console.log('g')
 var sql="Select * from `register` where `cus_id`='"+req.body.cust_id+"'"; 
// var sql = "INSERT INTO `service`(`user_Name`,`bedroom_cleaning`,`bedroom_qty`,`kitchen_cleaning`,`kitchen_qty`,`fabric_sofa`,`fabric_qty`,`quantity`,`amount`) VALUES ('"+req.body.user_Name+"','"+req.body.bedroom_cleaning+"','"+req.body.bedroom_qty+"','"+req.body.kitchen_cleaning	+"','"+req.body.kitchen_qty	+"','"+req.body.fabric_sofa	+"','"+req.body.fabric_qty	+"','"+req.body.quantity+"','"+req.body.amount+"')";
//                                                                                                                                                                                                                                                             var sql = "INSERT INTO `cost`(`user_Name`,`service_cost`,`center_gst`,`state_gst`,`tot`) VALUES ('"+req.body.user_Name+"','"+req.body.service_cost+"','"+req.body.center_gst+"','"+req.body.state_gst+"','"+req.body.tot+"')";
                                                                                                                                                                                                                                                                                                                      
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
/////////////////////////////////////////
app.get('/count_completed',(req,res)=>{
  //var sql="SELECT * FROM `acservice`"
   var sql="SELECT * FROM `cart1`"
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
////////////////////////////////////////////////////////////UPSO_DRIVER-API Starting////////////////////////////////////////////////////////////////////////
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
app.put('/del_image1',(req,res)=>{
  var sql="SELECT * FROM `products` where `product_id`='"+req.body.product_id+"'";
   
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

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
app.get('/del_image',(req,res)=>{
  var sql="SELECT * FROM `products`";
   
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("login");
   con.query(sql,function(err,result){
    if(err){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
   console.log("login");
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