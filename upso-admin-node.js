var express = require('express')
var app = express()
const port = 2002;  
const bodyparser=require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())
let date = require('date');
var mysql = require('mysql');
var sql1=require('mysql');
var con = mysql.createConnection({
  host: "88.198.201.38",
  user: "admin_upso_admin",
  password: "upso_admin",
  database: "admin_upso_admin"
});
let now = new Date();
  //let next_month = date.addMonths(now,0); // => Date object
  console.log(now);
    
con.connect((err)=>{
  if(!err)
  {
    console.log('db connection suceeded');
    //console.log(now) 
    //console.log(date.format(now, 'YYYY/MM/DD '));    // => '2015/01/02 23:14:05'
  }
    else 
    
     console.log('db connected failed \n error:'+JSON.stringify(err,undefined,2));
    
});

//booking_list
app.use(function (req, res, next) {

  // Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', "*");

 // Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 // Request headers you wish to allow
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token,  Content-Type, Accept, x-client-key, x-client-token, x-client-secret,x-skyzip-mode, Authorization");

 // Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
 res.setHeader('Access-Control-Allow-Credentials', true);

 // Pass to next layer of middleware
 next();
});


app.post('/booking_list',(req,res)=>{
	
	console.log(req.body);
  var sql = "INSERT INTO `booking_list`(`date`,`time`,`full_name`,`address`,`city`,`state`,`zip`,`mobile`) VALUES  ('"+req.body.date+"','"+req.body.time+"','"+req.body.full_name+"','"+req.body.address+"','"+req.body.city+"','"+req.body.state+"','"+req.body.zip+"','"+req.body.mobile+"')";
var success = { "status" : "success" };
   var failed = { "status" : "failed" };
 
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
//bookup
app.post('/bookup',(req,res)=>{
  var sql="UPDATE `booking_list` SET `date`='"+req.body.date+"',`time`='"+req.body.time+"',`full_name`='"+req.body.full_name+"',`address`='"+req.body.address+"',`city`='"+req.body.city+"',`state`='"+req.body.state+"',`zip`='"+req.body.zip+"',`mobile`='"+req.body.mobile+"' where `id`='"+req.body.id+"'";
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
  //book
  app.get('/book',(req,res)=>{
  
    var sql="SELECT * FROM `booking_list` where `id`='"+req.body.id+"'"
      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("completed");
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
  //book_delete
  app.put('/book_delete',(req,res)=>{
    var sql="DELETE  FROM `booking_list` where id= '"+req.body.Id+"'"
      var success = { "status" : "success" };
    var failed = { "status" : "failed" };
  
    console.log("TOTAL ORDERS");
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
  //booking_status
  app.post('/booking_status',(req,res)=>{
	
    console.log(req.body);
    var sql = "INSERT INTO `booking_status`(`booking_id`,`service_name`,`user_name`,`address`,`email`,`mobile`,`status`) VALUES  ('"+req.body.booking_id+"','"+req.body.service_name+"','"+req.body.user_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.status+"')";
  
   
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
  //booking_status_update
  app.put('/booking_status_update',(req,res)=>{
    var sql="UPDATE `booking_status` SET `booking_id`='"+req.body.booking_id+"',`service_name`='"+req.body.service_name+"',`user_name`='"+req.body.user_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"',`status`='"+req.body.status+"' where `booking_id`='"+req.body.booking_id+"'";
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
    //booking_select
    app.get('/status_select',(req,res)=>{
  
      var sql="SELECT * FROM `booking_status`"
        var success = { "status" : "success" };
      var failed = { "status" : "failed" };
    
      console.log("status select");
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
    app.put('/booking_status_select1',(req,res)=>{
  
      var sql="SELECT * FROM `booking_status` where booking_id= '"+req.body.booking_id+"'"
        var success = { "status" : "success" };
      var failed = { "status" : "failed" };
    
      console.log("status select");
       con.query(sql,function(err,result){
        if(err){
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
        res.send(err);
         }
         else{
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
          console.log(sql)
          res.send(result);
        }
       });
    })
    //booking_delete
    app.put('/status_delete',(req,res)=>{
      var sql="DELETE  FROM `booking_status` where booking_id= '"+req.body.booking_id+"'"
        var success = { "status" : "success" };
      var failed = { "status" : "failed" };
    
      console.log("TOTAL ORDERS");
       con.query(sql,function(err,result){
        if(err){
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
        res.send(err);
         }
         else{
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
          console.log(sql)
          res.send(result);
        }
       });
    })
    //delivery_list
    //delivery_select
    app.get('/delivery_select',(req,res)=>{
     var sql="SELECT * FROM `booking_status` WHERE `status`='dispatched'"
     
        var success = { "status" : "success" };
      var failed = { "status" : "failed" };
    
      console.log("completed")
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
      //service
      //service_insert
      app.post('/service',(req,res)=>{
	
        console.log(req.body);
        var sql = "INSERT INTO `service`(`service_id`,`service_name`,`address`,`email`,`mobile`) VALUES  ('"+req.body.service_id+"','"+req.body.service_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";
      
       
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
      //service
      //service_update
      app.put('/service_update',(req,res)=>{
        var sql="UPDATE `service` SET `service_id`='"+req.body.service_id+"',`service_name`='"+req.body.service_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `service_id`='"+req.body.service_id+"'";
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
        //service
        //service_select
        app.get('/service_select',(req,res)=>{
  
          var sql="SELECT * FROM `service`"
            var success = { "status" : "success" };
          var failed = { "status" : "failed" };
        
          console.log("service select");
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

        app.put('/service_select1',(req,res)=>{
  
          var sql="SELECT * FROM `service` where service_id= '"+req.body.service_id+"' "
            var success = { "status" : "success" };
          var failed = { "status" : "failed" };
        
          console.log("service select");
           con.query(sql,function(err,result){
            if(err){
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
        
            res.send(err);
             }
             else{
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
        console.log(sql)
              res.send(result);
            }
           });
        })  
        //service
        //service_delete
        app.put('/service_delete',(req,res)=>{
        //  var sql="DELETE  FROM `service` where service_id= '"+req.body.service_id+"'"
        var sql="DELETE  FROM `service` where service_id= '"+req.body.service_id+"'"

            var success = { "status" : "success" };
          var failed = { "status" : "failed" };
        
          console.log("TOTAL ORDERS");
           con.query(sql,function(err,result){
            if(err){
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
        
            res.send(err);
             }
             else{
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            console.log(sql)
              res.send(result);
            }
           });
        })
        //user
        //user_insert
        app.post('/user_insert',(req,res)=>{
	
          console.log(req.body);
          var sql = "INSERT INTO `user`(`user_id`,`user_name`,`address`,`email`,`mobile`) VALUES  ('"+req.body.user_id+"','"+req.body.user_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";
        
         
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
          //user_update
          app.post('/user_update',(req,res)=>{
            var sql="UPDATE `user` SET `user_id`='"+req.body.user_id+"',`user_name`='"+req.body.user_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `user_id`='"+req.body.user_id+"'";
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
            //user_select
            app.get('/user_select',(req,res)=>{
  
              var sql="SELECT * FROM `user`"
                var success = { "status" : "success" };
              var failed = { "status" : "failed" };
            
              console.log("completed");
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
            //user_delete
            app.get('/user_delete',(req,res)=>{
              var sql="DELETE  FROM `user` where user_id= '"+req.body.user_id+"'"
                var success = { "status" : "success" };
              var failed = { "status" : "failed" };
            
              console.log("TOTAL ORDERS");
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

  
               //user_list
               //list_insert
               app.post('/list_insert',(req,res)=>{
	
                console.log(req.body);
                var sql = "INSERT INTO `user_list`(`user_name`,`address`,`email`,`mobile`) VALUES  ('"+req.body.user_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";
              
               
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
               
               //user_list
            //list_upade
            app.post('/list_update',(req,res)=>{
              var sql="UPDATE `user_list` SET `user_name`='"+req.body.user_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `email`='"+req.body.email+"'";
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
              //list_select
              app.get('/list_select',(req,res)=>{
  
                var sql="SELECT * FROM `user_list` where `email`='"+req.body.email+"'"
                  var success = { "status" : "success" };
                var failed = { "status" : "failed" };
              
                console.log("completed");
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
              //list_delete
              app.get('/list_delete',(req,res)=>{
                var sql="DELETE  FROM `use_list` where email= '"+req.body.email+"'"
                  var success = { "status" : "success" };
                var failed = { "status" : "failed" };
              
                console.log("TOTAL ORDERS");
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
                 //user_order
                 //order_insert
                 app.post('/order_insert',(req,res)=>{
	
                  console.log(req.body);
                  var sql = "INSERT INTO `user_order`(`user_id`,`user_name`,`service_name`,`service_id`,`address`,`email`,`status`) VALUES  ('"+req.body.user_id+"','"+req.body.user_name+"','"+req.body.service_name+"','"+req.body.service_id+"','"+req.body.address+"','"+req.body.email+"','"+req.body.status+"')";
                
                 
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
                  //order_update
                  app.put('/order_update',(req,res)=>{
                    var sql="UPDATE `user_order` SET `user_id`='"+req.body.user_id+"',`user_name`='"+req.body.user_name+"',`service_name`='"+req.body.service_name+"',`service_id`='"+req.body.service_id+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`status`='"+req.body.status+"' where `user_id`='"+req.body.user_id+"'";
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
                    //order_select
                    app.get('/order_select',(req,res)=>{
  
                      var sql="SELECT * FROM `user_order`"
                        var success = { "status" : "success" };
                      var failed = { "status" : "failed" };
                    
                      console.log("full select");
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
                    app.put('/order_select1',(req,res)=>{
  
                      var sql="SELECT * FROM `user_order` where user_id='"+req.body.user_id+"'"
                        var success = { "status" : "success" };
                      var failed = { "status" : "failed" };
                    
                      console.log("select");
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
                   
                    //order_delete
                    app.post('/order_delete',(req,res)=>{
                      var sql="DELETE   FROM `user_order` where user_id= '"+req.body.user_id+"'"
                //      var sql="DELETE  FROM `products` where product_id= '"+req.body.product_id+"'"

                        var success = { "status" : "success" };
                      var failed = { "status" : "failed" };
                    
                      console.log("deleted");
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
                    //vendor
                    //vendor_insert
                    app.post('/vendor_insert',(req,res)=>{
	
                      console.log(req.body);
                      var sql = "INSERT INTO `vendor`(`vendor_id`,`vendor_name`,`address`,`email`,`mobile`) VALUES  ('"+req.body.vendor_id+"','"+req.body.vendor_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";
                    
                     
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
                      //vendor_update
                      app.post('/vendor_update',(req,res)=>{
                        var sql="UPDATE `vendor` SET `vendor_id`='"+req.body.vendor_id+"',`vendor_name`='"+req.body.vendor_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `vendor_id`='"+req.body.vendor_id+"'";
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
                        //vendor_select
                        app.get('/vendor_select',(req,res)=>{
  
                          var sql="SELECT * FROM `vendor`"
                            var success = { "status" : "success" };
                          var failed = { "status" : "failed" };
                        
                          console.log("completed");
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
                      
      
                      
                        //vendor_delete
                        app.get('/vendor_delete',(req,res)=>{
                          var sql="DELETE  FROM `vendor` where vendor_id= '"+req.body.vendor_id+"'"
                            var success = { "status" : "success" };
                          var failed = { "status" : "failed" };
                        
                          console.log("TOTAL ORDERS");
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
                          //vendor_creation
                          //creation_insert
                          app.post('/booking_insert',(req,res)=>{
	
                            console.log(req.body);
                            var sql = "INSERT INTO `vendor_creation`(`vendor_id`,`vendor_name`,`shop_name`,`shop_id`,`address`,`email`,`mobile`) VALUES  ('"+req.body.vendor_id+"','"+req.body.vendor_name+"','"+req.body.shop_name+"','"+req.body.shop_id+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";
            
                           
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
                            //creation_update
                            app.put('/vendor_creation_update',(req,res)=>{
                              var sql="UPDATE `vendor_creation` SET `vendor_id`='"+req.body.vendor_id+"',`vendor_name`='"+req.body.vendor_name+"',`shop_name`='"+req.body.shop_name+"',`shop_id`='"+req.body.shop_id+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `vendor_id`='"+req.body.vendor_id+"'";
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
                              app.get('/vendor_creation_select',(req,res)=>{
                             //   var sql="SELECT * FROM `vendor`"

                               var sql="SELECT * FROM `vendor_creation` "
                                  var success = { "status" : "success" };
                                var failed = { "status" : "failed" };
                              
                                console.log("completed");
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
                              //creation_select
                              app.get('/creation_select',(req,res)=>{
  
                                var sql="SELECT * FROM `vendor_creation` where `vendor_id`='"+req.body.vendor_id+"'"
                                  var success = { "status" : "success" };
                                var failed = { "status" : "failed" };
                              
                                console.log("completed");
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
                              //creation_delete
                              app.put('/creation_delete',(req,res)=>{
                                var sql="DELETE  FROM `vendor_creation` where vendor_id= '"+req.body.vendor_id+"'"
                                  var success = { "status" : "success" };
                                var failed = { "status" : "failed" };
                              
                                console.log("TOTAL ORDERS");
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
                                //executive_list
                                //list_i
                                app.post('/list_insert',(req,res)=>{
	
                                  console.log(req.body);
                                  var sql = "INSERT INTO `executive_list`(`executive_id`,`executive_name`,`address`,`email`,`mobile`) VALUES  ('"+req.body.executive_id+"','"+req.body.executive_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";
                                
                                 
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
                                
                                //list_up
                                app.put('/executive_id_list_update',(req,res)=>{
                                  var sql="UPDATE `executive_list` SET `executive_id`='"+req.body.executive_id+"',`executive_name`='"+req.body.executive_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `executive_id`='"+req.body.executive_id+"'";
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
                                  //list_se
                                  app.get('/executive_list_select',(req,res)=>{
  
                                    var sql="SELECT * FROM `executive_list`"
                                      var success = { "status" : "success" };
                                    var failed = { "status" : "failed" };
                                  
                                    console.log("list select");
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
                                  app.put('/list_select_id',(req,res)=>{
  
                                    var sql="SELECT * FROM `executive_list` where executive_id= '"+req.body.executive_id+"'"
                                      var success = { "status" : "success" };
                                    var failed = { "status" : "failed" };
                                  
                                    console.log("select id");
                                     con.query(sql,function(err,result){
                                      if(err){
                                      res.setHeader('Content-Type', 'application/json; charset=utf-8');
                                  
                                      res.send(err);
                                       }
                                       else{
                                      res.setHeader('Content-Type', 'application/json; charset=utf-8');
                                        console.log(sql)
                                        res.send(result);
                                      }
                                     });
                                  })
                                  // list_de
                                  app.put('/executive_list_delete',(req,res)=>{
                                    var sql="DELETE  FROM `executive_list` where executive_id= '"+req.body.executive_id+"'"
                                      var success = { "status" : "success" };
                                    var failed = { "status" : "failed" };
                                  
                                    console.log("list delete");
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
                                  //executive_earning
                                  //executive_insert
                                  app.post('/executive_insert',(req,res)=>{
	
                                    console.log(req.body);
                                    var sql = "INSERT INTO `executive_earning`(`executive_id`,`executive_name`,`service_name`,`address`,`email`,`mobile`,`status`,`amount`) VALUES  ('"+req.body.executive_id+"','"+req.body.executive_name+"','"+req.body.service_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.status+"','"+req.body.amount+"')";
                    
                                   
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
                                    // executive_update
                                    app.post('/executive_update',(req,res)=>{
                                      var sql="UPDATE `executive_earning` SET `executive_id`='"+req.body.executive_id+"',`executive_name`='"+req.body.executive_name+"'`service_name`='"+req.body.service_name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"',`status`='"+req.body.status+"',`amount`='"+req.body.amount+"' where `executive_id`='"+req.body.executive_id+"'";
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
                                      //executive_select 
                                      app.get('/executive_select',(req,res)=>{
  
                                        var sql="SELECT * FROM `executive_earning`"
                                          var success = { "status" : "success" };
                                        var failed = { "status" : "failed" };
                                      
                                        console.log("completed");
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
                                      //executive_delete
                                      app.get('/executive_delete',(req,res)=>{
                                        var sql="DELETE  FROM `executive_earning` where executive_id= '"+req.body.executive_id+"'"
                                          var success = { "status" : "success" };
                                        var failed = { "status" : "failed" };
                                      
                                        console.log("TOTAL ORDERS");
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
                                      //executive_status
                                      //status_insert
                                      app.post('/status_ins',(req,res)=>{
	
                                        console.log(req.body);
                                        var sql = "INSERT INTO `executive_status`(`service_id`,`executive_name`,`address`,`email`,`mobile`,`status`) VALUES  ('"+req.body.service_id+"','"+req.body.executive_name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.status+"')";
                        
                                       
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
                                        //status_update
                                        app.post('/status_upd',(req,res)=>{
                                          var sql="UPDATE `executive_status` SET `service_id`='"+req.body.service_id+"',`executive_name`='"+req.body.executive_name+"',address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"',`status`='"+req.body.status+"' where `service_id`='"+req.body.service_id+"'";
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
                                          //status_select
                                          app.get('/status_secl',(req,res)=>{
  
                                            var sql="SELECT * FROM `executive_status`"
                                              var success = { "status" : "success" };
                                            var failed = { "status" : "failed" };
                                          
                                            console.log("completed");
                                             con.query(sql,function(err,result){
                                              if(err){
                                              res.setHeader('Content-Type', 'application/json; charset=utf-8');
                                          
                                      }
                                               else{
                                              res.setHeader('Content-Type', 'application/json; charset=utf-8');
                                          
                                                res.send(result);
                                              }
                                             });
                                          }) 
                                          //executive_delete
                                          app.get('/status_delet',(req,res)=>{
                                            var sql="DELETE  FROM `executive_status` where service_id= '"+req.body.service_id+"'"
                                              var success = { "status" : "success" };
                                            var failed = { "status" : "failed" };
                                          
                                            console.log("TOTAL ORDERS");
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
                                             //driver_details
                                             //detail_insert
                                             app.post('/detail_insert',(req,res)=>{
                                              console.log(req.body);
                                              var sql = "INSERT INTO `driver_details`(`date`,`time`,`driver_id`,`driver_name`,`address`,`mobile`,`car_no`,`duration`) VALUES  ('"+req.body.date+"','"+req.body.time+"','"+req.body.driver_id+"','"+req.body.driver_name+"','"+req.body.address+"','"+req.body.mobile+"','"+req.body.car_no+"','"+req.body.duration+"')";
                                            
                                             
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
                                            //detail_update
                                            app.post('/detail_update',(req,res)=>{
                                              var sql="UPDATE `deliver_details` SET `date`='"+req.body.date+"',`time`='"+req.body.time+"',`driver_id`='"+req.body.driver_id+"',`driver_name`='"+req.body.driver_name+"',`address`='"+req.body.address+"',`mobile`='"+req.body.mobile+"',`car_no`='"+req.body.car_no+"',`duration`='"+req.body.duration+"' where `driver_id`='"+req.body.driver_id+"'";
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
                                              //detail_select
                                              app.get('/book',(req,res)=>{
  
                                                var sql="SELECT * FROM `booking_list` where `id`='"+req.body.id+"'"
                                                  var success = { "status" : "success" };
                                                var failed = { "status" : "failed" };
                                              
                                                console.log("completed");
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
                                              //detail_delete
                                              app.put('/status_delete',(req,res)=>{
                                                var sql="DELETE  FROM `booking_status` where booking_id= '"+req.body.booking_id+"'"
                                                  var success = { "status" : "success" };
                                                var failed = { "status" : "failed" };
                                              
                                                console.log("TOTAL ORDERS");
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






                              
                               
          
                                                


                            




                                        
                                        
                                      app.post('/login',(req,res)=>{
  var sql = "INSERT INTO `login`(`user_Name`,`password`) VALUES   ('"+req.body.user_Name+"','"+req.body.password+"')";
 
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

app.get('/login_get',(req,res)=>{
  var sql="SELECT * FROM `login` "
      var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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



app.post('/register',(req,res)=>{
	
	console.log(req.body);
  var otpkey= Math.floor(1000 + Math.random() * 9000);
 var sql = "INSERT INTO `users`(`phone_Number`,`otpkey`) VALUES ('"+req.body.mobile+"','"+otpkey+"')";
 
  console.log(otpkey);
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };
  var otpkey={"status":"1111"};

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(success);
    }
   });
})
app.post('/otpverification',(req,res)=>{
    
    var sql="SELECT * FROM `users` WHERE phone_Number='"+req.body.mobile+"'";  
  
    
  con.query(sql,function(err,result){

    if(err){
      res.send("{ status : failed }");
     }
     else{

      if ( result[0].otpkey == req.body.otpkey) 
      {
        console.log("DB OTP "+ result.otpkey + "GIVEN OTP"+req.body.otpkey)
        
      res.send("{ 'status' : 'OTP Verified' }");
      }
      else{
        console.log("please enter valid ")
        
      res.send("{ 'status' : 'Wrong OTP' }");
      }

    }
   });
})

//register
app.post('/upso_register',(req,res)=>{
  var sql = "INSERT INTO `register`(`first_Name`,`last_Name`,`mobile_Number`,`email`,`password`) VALUES   ('"+req.body.first_Name+"','"+req.body.last_Name+"','"+req.body.mobile_Number+"','"+req.body.email+"','"+req.body.password+"')";
 
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
//yourcart
app.get('/register_get',(req,res)=>{
  var sql="SELECT * FROM `register`"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.post('/AC_Service',(req,res)=>{
  var sql = "INSERT INTO `ac-service`(`split`,`subtotal`,`order_Id`) VALUES   ('"+req.body.split+"','"+req.body.subtotal+"','"+req.body.order_Id+"')";
 
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

//your-cart->
app.get('/AC_Service_get',(req,res)=>{
  var sql="SELECT date,time FROM `ac-service` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//orders->editorder
app.get('/Ac_service_update',(req,res)=>{
  var sql="UPDATE `ac-service` SET `date`='"+req.body.date+"',`time`='"+req.body.time+"',`status2`='"+req.body.status2+"' where `order_Id`='"+req.body.order_Id+"'";
  

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
//delete orders
app.post('/Ac_service_delete',(req,res)=>{
  var sql="DELETE  FROM `ac-service` where order_Id= '"+req.body.order_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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



//statusorders->pending
app.post('/statusorders',(req,res)=>{
  
  var sql="SELECT * FROM `orders` where status2='pending'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//orderstatus->completed
app.get('/statusorders_completed',(req,res)=>{
  
  var sql="SELECT * FROM `orders` where status2='completed'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("completed");
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
//orderstatus->inprogress
app.get('/statusorders_inprogress',(req,res)=>{
  
  var sql="SELECT * FROM `orders` where status2='inprogress'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("completed");
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

//vendor
app.get('/vendor',(req,res)=>{
  var sql = "INSERT INTO `vendor`(`vendor_Name`,`shop_Name`,`address`,`mobile`,`email`,`password`,`profile_Image`) VALUES  ('"+req.body.vendor_Name+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.mobile+"','"+req.body.email+"','"+req.body.password+"','"+req.body.profile_Image+"')";

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
//vendor_get->active
app.get('/vendor_get',(req,res)=>{
  
  var sql="SELECT date,vendor_Id,vendor_Name,shop_Name,shop_Id,address,email,mobile,subscription_period FROM `vendor` where status='active' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//vendor_get->suspended
app.get('/vendor_get',(req,res)=>{
  
  var sql="SELECT date,vendor_Id,vendor_Name,shop_Name,shop_Id,address,email,mobile,subscription_period FROM `vendor` where status='suspended' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

//delete vendor
app.post('/vendor_delete',(req,res)=>{
  var sql="DELETE  FROM `vendor` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

//user management
app.post('/user_Management',(req,res)=>{
  var sql = "INSERT INTO `user_view`(`date`,`user_Id`,`user_Name`,`address`,`email`,`mobile`,`user_Mode`) VALUES ('"+req.body.date+"','"+req.body.user_Id+"','"+req.body.user_Name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.user_Mode+"')";

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
//usermanagement get
app.get('/usermanagement_get',(req,res)=>{
  var sql="SELECT * FROM `user_view` where user_Id= '"+req.body.user_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//usermanagement edit
app.post('/user_edit',(req,res)=>{
  var sql="UPDATE `user_view` SET `date`='"+req.body.date+"',`user_Id`='"+req.body.user_Id+"',`user_Name`='"+req.body.user_Name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"',`user_Mode`='"+req.body.user_Mode+"' where `user_Id`='"+req.body.user_Id+"'";
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
//user delete
app.post('/user_delete',(req,res)=>{
  var sql="DELETE  FROM `user_view` where user_Id= '"+req.body.user_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//products

app.get('/product_get',(req,res)=>{
  var sql="SELECT * FROM `products` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//product_edit
app.post('/product_edit',(req,res)=>{
  var sql="UPDATE `product` SET `category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`image`='"+req.body.image+"' where `product_Id`='"+req.body.product_Id+"'";
  
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
//product->addproduct
app.post('/product',(req,res)=>{
  var sql = "INSERT INTO `products`(`product_id`,`product_item`,`sub_product`,`product_image`,`amt`,`oamt`,`discount`) VALUES  ('"+req.body.product_id+"','"+req.body.product_item+"','"+req.body.sub_product+"','"+req.body.amt+"','"+req.body.oamt+"','"+req.body.discount+"')";

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

//product1_edit1
app.put('/product_edit1',(req,res)=>{
  var sql="UPDATE `products` SET `product_id`='"+req.body.product_id+"',`product_item`='"+req.body.product_item+"',`sub_product`='"+req.body.sub_product+"',`product_image`='"+req.body.product_image+"',`amt`='"+req.body.amt+"',`oamt`='"+req.body.oamt+"',`discount`='"+req.body.discount+"' where `product_id`='"+req.body.product_id+"'";
  
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

//product_delete
app.put('/product_delete',(req,res)=>{
  var sql="DELETE  FROM `products` where product_id= '"+req.body.product_id+"'"
      var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("deleted");
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



app.post('/staff_Management',(req,res)=>{
  var sql = "INSERT INTO `staff_view`(`staff_id`,`staff_Name`,`address`,`email`,`mobile`) VALUES ('"+req.body.staff_id+"','"+req.body.staff_Name+"','"+req.body.address+"','"+req.body.email+"','"+req.body.mobile+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql);
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/staffmanagement_get',(req,res)=>{
  var sql="SELECT * FROM `staff_view` where staff_id= '"+req.body.staff_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.get('/staff_get',(req,res)=>{
  var sql="SELECT * FROM `staff_view` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

app.post('/staff_edit',(req,res)=>{
  var sql="UPDATE `staff_view` SET `staff_id`='"+req.body.staff_id+"',`staff_Name`='"+req.body.staff_Name+"',`address`='"+req.body.address+"',`email`='"+req.body.email+"',`mobile`='"+req.body.mobile+"' where `mobile`='"+req.body.mobile+"'";
    
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
app.post('/staffmanagement_delete',(req,res)=>{
  var sql="DELETE  FROM `staff_view` where staff_id= '"+req.body.staff_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("deleted");
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

//inventry->purchase

app.post('/purchase',(req,res)=>{
  var sql = "INSERT INTO `purchase`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`mobile`) VALUES ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.mobile+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//inventry-purchase-get
app.get('/purchase_get',(req,res)=>{
  var sql="SELECT * FROM `purchase` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//inventry-purchase-get-edit
app.get('/purchase_get_edit',(req,res)=>{
  var sql="SELECT * FROM `purchase` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

app.post('/purchase_edit',(req,res)=>{
  var sql="UPDATE `purchase` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`mobile`='"+req.body.mobile+"' where `product_Id`='"+req.body.product_Id+"'";
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
app.post('/purchase_delete',(req,res)=>{
  var sql="DELETE  FROM `purchase` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

//shop_Management->offline shop
app.post('/offline_shop',(req,res)=>{
  var sql = "INSERT INTO `offline_shop`(`shop_Name`,`shop_Address`,`mobile`,`email`,`image`) VALUES ('"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.mobile+"','"+req.body.email+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/offline_shop_get',(req,res)=>{
  var sql="SELECT * FROM `offline_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//offline->get
app.get('/offline_shop_update',(req,res)=>{
  var sql="SELECT * FROM `offline_shop` where mobile='"+req.body.mobile+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.post('/offline_shop_edit',(req,res)=>{
  var sql="UPDATE `offline_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`mobile`='"+req.body.mobile+"',`email`='"+req.body.email+"',`image`='"+req.body.image+"' where `mobile`='"+req.body.mobile+"'";
 
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
app.post('/offline_delete',(req,res)=>{
  var sql="DELETE  FROM `offline_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//online

//shop_Management->onLine shop
app.post('/online_shop',(req,res)=>{
  var sql = "INSERT INTO `online_shop`(`shop_Name`,`shop_Address`,`mobile`,`email`,`image`) VALUES ('"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.mobile+"','"+req.body.email+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/online_shop_get',(req,res)=>{
  var sql="SELECT * FROM `online_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//onfline->get
app.get('/online_shop_update',(req,res)=>{
  var sql="SELECT * FROM `online_shop` where mobile='"+req.body.mobile+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.post('/online_shop_edit',(req,res)=>{
  var sql="UPDATE `online_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`mobile`='"+req.body.mobile+"',`email`='"+req.body.email+"',`image`='"+req.body.image+"' where `mobile`='"+req.body.mobile+"'";
 
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
app.post('/online_delete',(req,res)=>{
  var sql="DELETE  FROM `online_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

//shop_Management->exclusiveshop
app.post('/exclusive_shop',(req,res)=>{
  var sql = "INSERT INTO `exclusive_shop`(`shop_Id`,shop_Name`,`shop_Address`,`offers`,`image`) VALUES ('"+req.body.shop_Id+"','"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.offers+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/exclusive_shop_get',(req,res)=>{
  var sql="SELECT * FROM `exclusive_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
/app.post('/exclusive_shop_edit',(req,res)=>{
  var sql="UPDATE `exclusive_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`offers`='"+req.body.offers+"',`image`='"+req.body.image+"' where `shop_Id`='"+req.body.shop_Id+"'";
  
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
app.post('/exclusive_delete',(req,res)=>{
  var sql="DELETE  FROM `exclusive_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

app.post('/exclusive_shop',(req,res)=>{
  var sql = "INSERT INTO `exclusive_shop`(`shop_Name`,`shop_Address`,`offers`,`image`) VALUES ('"+req.body.shop_Name+"','"+req.body.shop_Address+"','"+req.body.offers+"','"+req.body.image+"')";

  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/exclusive_shop_get',(req,res)=>{
  var sql="SELECT * FROM `exclusive_shop` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
/app.post('/exclusive_shop_edit',(req,res)=>{
  var sql="UPDATE `exclusive_shop` SET `shop_Name`='"+req.body.shop_Name+"',`shop_Address`='"+req.body.shop_Address+"',`mobile`='"+req.body.mobile+"',`email`='"+req.body.email+"',`image`='"+req.body.image+"' where `mobile`='"+req.body.mobile+"'";
 
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
app.post('/exclusive_delete',(req,res)=>{
  var sql="DELETE  FROM `exclusive_shop` where mobile= '"+req.body.mobile+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//shipping rate
//payment
 
app.post('/shipping',(req,res)=>{
  var sql = "INSERT INTO `shipping`(`description`,`amount`) VALUES ('"+req.body.description+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/shipping_get',(req,res)=>{
  var sql="SELECT * FROM `shipping`"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.get('/shipping_update',(req,res)=>{
  var sql="SELECT * FROM `shipping` where description='normal' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

/app.post('/shipping_edit',(req,res)=>{
  var sql="UPDATE `shipping` SET `user_Name`='"+req.body.user_Name+"',`details`='"+req.body.details+"',`product_Details`='"+req.body.product_Details+"',`amount`='"+req.body.amount+"',`payment_Status`='"+req.body.payment_Status+"',`payment_Mode`='"+req.body.payment_Mode+"',`Delivery_Mode`='"+req.body.Delivery_Mode+"' where `product_Id`='"+req.body.product_Id+"'";
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
app.post('/shipping_delete',(req,res)=>{
  var sql="DELETE  FROM `shipping` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
 

//payment
 
app.post('/payment',(req,res)=>{
  var sql = "INSERT INTO `payment`(`product_Id`,user_Name`,`details`,`product_Details`,`amount`,`payment_Status`,`payment_Mode`,`Delivery_Mode`) VALUES ('"+req.body.product_Id+"','"+req.body.user_Name+"','"+req.body.details+"','"+req.body.product_Details+"','"+req.body.amount+"','"+req.body.payment_Status+"','"+req.body.payment_Mode+"','"+req.body.Delivery_Mode+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/payment_get',(req,res)=>{
  var sql="SELECT * FROM `payment` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
/app.post('/payment_edit',(req,res)=>{
  var sql="UPDATE `payment` SET `user_Name`='"+req.body.user_Name+"',`details`='"+req.body.details+"',`product_Details`='"+req.body.product_Details+"',`amount`='"+req.body.amount+"',`payment_Status`='"+req.body.payment_Status+"',`payment_Mode`='"+req.body.payment_Mode+"',`Delivery_Mode`='"+req.body.Delivery_Mode+"' where `product_Id`='"+req.body.product_Id+"'";
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
app.post('/payment_delete',(req,res)=>{
  var sql="DELETE  FROM `payment` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
 
//mywallet
app.post('/mywallet',(req,res)=>{
  var sql = "INSERT INTO `mywallet`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`amount`) VALUES   ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/mywallet_get',(req,res)=>{
  var sql="SELECT * FROM `mywallet` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.post('/mywallet_edit',(req,res)=>{
  var sql="UPDATE `mywallet` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`amount`='"+req.body.amount+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
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
app.post('/mywallet_delete',(req,res)=>{
  var sql="DELETE  FROM `mywallet` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//offer
app.post('/offer_insert',(req,res)=>{
  var sql = "INSERT INTO `offer_rewards`(`offer_id`,`category`,`offers`,`rewards`,`action`) VALUES ('"+req.body.offer_id+"','"+req.body.category+"','"+req.body.offers+"','"+req.body.rewards+"','"+req.body.action+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/offer_get',(req,res)=>{
  var sql="SELECT * FROM `offer_rewards` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.put('/offer_get1',(req,res)=>{
  var sql="SELECT * FROM `offer_rewards` where offer_id= '"+req.body.offer_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.put('/offer_edit',(req,res)=>{
  var sql="UPDATE `offer_rewards` SET `offer_id`='"+req.body.offer_id+"',`category`='"+req.body.category+"',`offers`='"+req.body.offers+"',`rewards`='"+req.body.rewards+"',`action`='"+req.body.action+"' where `offer_id`='"+req.body.offer_id+"'";
  
  

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
app.put('/offer_delete',(req,res)=>{
  var sql="DELETE  FROM `offer_rewards` where offer_id= '"+req.body.offer_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

app.post('/driverdetails_insert',(req,res)=>{
  var sql = "INSERT INTO `driver_pertsonal`(`driver_id`,`firstname`,`lastname`,`phone`,`email`,`password`,`year`,`language`,`from_address`) VALUES   ('"+req.body.driver_id+"','"+req.body.firstname+"','"+req.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.password+"','"+req.body.year+"','"+req.body.language+"','"+req.body.from_address+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/driverdetails_get',(req,res)=>{
  var sql="SELECT * FROM `driver_personal` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.put('/driverdetails_get1',(req,res)=>{
  var sql="SELECT * FROM `driver_personal` where driver_id= '"+req.body.driver_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.put('/driverdetails_edit',(req,res)=>{
  var sql="UPDATE `driver_personal` SET `driver_id`='"+req.body.driver_id+"',`firstname`='"+req.body.firstname+"',`lastname`='"+req.body.lastname+"',`phone`='"+req.body.phone+"',`email`='"+req.body.email+"',`password`='"+req.body.password+"',`year`='"+req.body.year+"',`language`='"+req.body.language+"',`from_address`='"+req.body.from_address+"' where `driver_id`='"+req.body.driver_id+"'";

  

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
app.put('/driverdetails_delete',(req,res)=>{
  var sql="DELETE  FROM `driver_personal` where driver_id= '"+req.body.driver_id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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


//appshare wallet

app.post('/appwallet',(req,res)=>{
  var sql = "INSERT INTO `appwallet`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`amount`) VALUES   ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/appwallet_get',(req,res)=>{
  var sql="SELECT * FROM `appwallet` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.post('/appwallet_edit',(req,res)=>{
  var sql="UPDATE `payment` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`amount`='"+req.body.amount+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
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
app.post('/appwallet_delete',(req,res)=>{
  var sql="DELETE  FROM `appwallet` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
//product
app.post('/product',(req,res)=>{
  var sql = "INSERT INTO `product`(`category`,`product`,`product_Id`,`image`) VALUES   ('"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.image+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
//product->get
app.post('/product',(req,res)=>{
  var sql = "INSERT INTO `products`(`product_id`,`product`,`product_Id`,`image`) VALUES   ('"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.image+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/product_get',(req,res)=>{
  var sql="SELECT * FROM `products` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
app.put('/product_get1',(req,res)=>{
  var sql="SELECT * FROM `products` where product_id='"+req.body.product_id+"'  "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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

//product->edit
app.get('/product_get_edit',(req,res)=>{
  var sql="SELECT * FROM `product`where product_Id='"+req.body.product_Id+"' "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("product");
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
//product-edit
app.post('/product_edit',(req,res)=>{
  var sql="UPDATE `product` SET `category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`image`='"+req.body.image+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
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
//product->remove
app.post('/product_delete',(req,res)=>{
  var sql="DELETE  FROM `product` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("deleted");
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




//productshare wallet

app.post('/productwallet',(req,res)=>{
  var sql = "INSERT INTO `productwallet`(`date`,`category`,`product`,`product_Id`,`shop_Name`,`address`,`amount`) VALUES   ('"+req.body.date+"','"+req.body.category+"','"+req.body.product+"','"+req.body.product_Id+"','"+req.body.shop_Name+"','"+req.body.address+"','"+req.body.amount+"')";
                                                                                         
  var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log(sql); 
  con.query(sql,function(err,result){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
        if(err){

      res.send(err);
     }
     else{
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      res.send(result);
    }
   });
})
app.get('/productwallet_get',(req,res)=>{
  var sql="SELECT * FROM `productwallet` "
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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
/app.post('/productwallet_edit',(req,res)=>{
  var sql="UPDATE `product` SET `date`='"+req.body.date+"',`category`='"+req.body.category+"',`product`='"+req.body.product+"',`product_Id`='"+req.body.product_Id+"',`shop_Name`='"+req.body.shop_Name+"',`address`='"+req.body.address+"',`amount`='"+req.body.amount+"' where `product_Id`='"+req.body.product_Id+"'";
  
  
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
app.post('/productwallet_delete',(req,res)=>{
  var sql="DELETE  FROM `productwallet` where product_Id= '"+req.body.product_Id+"'"
    var success = { "status" : "success" };
  var failed = { "status" : "failed" };

  console.log("TOTAL ORDERS");
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


//service->order
  
 /*app.post('/order_Date',(req,res)=>{
  let now = new Date();
  //let next_month = date.addMonths(now,0); // => Date object
  console.log(now);
    
      
   })*/
//Store Banner///

app.post('/store',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `store_banner`(`banner_name`,`image`) VALUES ( '"+req.body.name+"','"+req.body.image+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getstore',(req,res)=>{
    var sql="SELECT * FROM `store_banner` where banner_name = '"+req.body.name+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

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
  app.post('/updatestore',(req,res)=>{
   var sql="UPDATE `store_banner` SET `banner_name`='"+req.body.name+"',`image`='"+req.body.image+"' WHERE `id`='"+req.body.id+"'";
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

// Delete Table//
  app.post('/deletestore',(req,res)=>{
   	  var sql="DELETE FROM `store_banner` where id= '"+req.body.id+ "'"

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




//---------------------//------------------------//



//App Banner///

app.post('/app',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `app_banner`(`banner_name`,`image`) VALUES ( '"+req.body.name+"','"+req.body.image+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getapp',(req,res)=>{
    var sql="SELECT * FROM `app_banner` where banner_name = '"+req.body.name+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

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
  app.post('/updateapp',(req,res)=>{
   var sql="UPDATE `app_banner` SET `banner_name`='"+req.body.name+"',`image`='"+req.body.image+"' WHERE `id`='"+req.body.id+"'";
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

// Delete Table//
  app.post('/deleteapp',(req,res)=>{
   	  var sql="DELETE FROM `app_banner` where id= '"+req.body.id+ "'"

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



//---------------------//------------------------//


//My Returns & Refunds///

app.post('/return',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `return_fund`(`date`,`order_id`,`description`,`status`,`product`,`shop`,`address`,`mobile`) VALUES ( '"+req.body.date+"','"+req.body.orderid+"','"+req.body.desc+"','"+req.body.status+"','"+req.body.product+"','"+req.body.shop+"','"+req.body.address+"','"+req.body.mobile+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getreturn',(req,res)=>{
    var sql="SELECT * FROM `return_fund` where id = '"+req.body.id+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

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
  app.post('/updatereturn',(req,res)=>{
	 var sql=" UPDATE `return_fund` SET `date`='"+req.body.date+"',`order_id`='"+req.body.order+"',`description`='"+req.body.desc+"',`status`='"+req.body.status+"',`product`='"+req.body.product+"',`shop`='"+req.body.shop+"',`address`='"+req.body.address+"',`mobile`='"+req.body.mobile+"' WHERE `id`='"+req.body.id+"'"
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

// Delete Table//
  app.post('/deletereturn',(req,res)=>{
   	  var sql="DELETE FROM `return_fund` where id= '"+req.body.id+ "'"

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




//---------------------//------------------------//

//Coupon///

app.post('/coupon',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `coupon`(`coupon_mode`,`status`) VALUES ( '"+req.body.coupon+"','"+req.body.status+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getcoupon',(req,res)=>{
    var sql="SELECT * FROM `coupon` where id = '"+req.body.id+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

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
  app.post('/updatecoupon',(req,res)=>{
   var sql="UPDATE `coupon` SET `coupon_mode`='"+req.body.coupon+"',`status`='"+req.body.status+"' WHERE `id`='"+req.body.id+"'";
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

// Delete Table//
  app.post('/deletecoupon',(req,res)=>{
   	  var sql="DELETE FROM `coupon` where id= '"+req.body.id+ "'"

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




//---------------------//------------------------//



//Service///

app.post('/service',(req,res)=>{
	
	console.log(req.body);

  //var sql = "INSERT INTO `creditcard``(`name`,`mobile`) VALUES ('"+req.body.name+"','"+req.body.mobile+"')";
  var sql = "INSERT INTO `service`(`coupon`,`code`) VALUES ( '"+req.body.coupon+"','"+req.body.code+"')";

  con.query(sql,function(err,result){
    if(err){
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(failed);
     }
     else{
       
	  res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    }
   });
})

 //Select Table//
  app.post('/getservice',(req,res)=>{
    var sql="SELECT * FROM `service` where id = '"+req.body.id+"'"
  //  var sql="SELECT * FROM `register` where mobile = '"+req.body.mobile+"'"

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
  app.post('/updateservice',(req,res)=>{
   var sql="UPDATE `service` SET `coupon`='"+req.body.coupon+"',`code`='"+req.body.code+"' WHERE `id`='"+req.body.id+"'";
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

// Delete Table//
  app.post('/deleteservice',(req,res)=>{
   	  var sql="DELETE FROM `service` where id= '"+req.body.id+ "'"

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
//////////////////////////////////////delivery///////////////////////////////////
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




//-------------console.log(error);--------//------------------------//




   

console.log("Working Fine!");
app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
