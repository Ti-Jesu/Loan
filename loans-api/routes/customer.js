var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const customerModel=require('../models/customer.model');

/* GET All customers. */
router.get('/list', function(req, res, next) {
 customerModel.find(function(err,customerListResponse){
  if (err){
    res.send({status:500, message: 'unable to find customer'})
}
else{
  const recordCount = customerListResponse.length
  res.send({status:200, recordCount: recordCount, results:customerListResponse});

}

 })
});

/* GET Details of a selected customer. */
router.get('/view', function(req, res, next) {

  const userId=req.query.userId;
  customerModel.findById(userId,function(err,customerResponse){
   if (err){
     res.send({status:500, message: 'unable to find the customer'})
 }
 else{
   const recordCount = customerResponse.length
   res.send({status:200, recordCount: recordCount, results:customerResponse});
 
 }
 
  })
 });



/* create new customer */
router.post('/add', function(req, res, next) {

  let firstName= req.body.firstName;
  let lastName= req.body.lastName;
  let password= req.body.password;
  let emailAddress= req.body.emailAddress;
  let phoneNumber= req.body.phoneNumber;
  let dob= req.body.dob;
    

  let customerObj = new customerModel({
    firstName: firstName,
    lastName: lastName,
    password: password,
    emailAddress: emailAddress,
    phoneNumber:phoneNumber,
    dob:dob 
  });
  customerObj.save(function(err, customerObj){
    if (err){
        res.send({status:500, message: 'unable to add customer'})
    }
    else{
      res.send({status:200, message: 'user added customer successfully', customerDetails:customerObj})

    }

  });
});

/* update existing customer */
router.put('/update', function(req, res, next) {
  
  const userId=req.body.userId;
   let firstName= req.body.firstName;
   let lastName= req.body.lastName;
   let emailAddress= req.body.emailAddress;
   let phoneNumber= req.body.phoneNumber;
   let dob= req.body.dob;

  let customerObj ={
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber:phoneNumber,
    dob:dob
  };  

//customerModel.findByIdAndUpdate(userId, ({'firstname':'Dayo'}), )
  customerModel.findByIdAndUpdate(userId, customerObj,function(err,customerResponse){
   if (err){
     res.send({status:500, message: 'unable to update the customer'})
 }
 else{
   res.send({status:200,message:'user updated successfully', results:customerObj});
 
 }
 
  });



});

// Delete an existing customer
router.delete('/delete', function(req, res, next) {

  const userId=req.query.userId;
  customerModel.findByIdAndDelete(userId,function(err,customerResponse){
   if (err){
     res.send({status:500, message: 'unable to find the customer'})
 }
 else{

   res.send({status:200, message:'Customer Deleted Successfully', results:customerResponse});
 
 }
 
  })
 });

 // Delete multiplr existing customer
router.delete('/delete-multiple', function(req, res, next) {

  customerModel.deleteMany({'firstName':'Kunle'},function(err,customerResponse){
   if (err){
     res.send({status:500, message: 'unable to find the customer'})
 }
 else{

   res.send({status:200, message:'Customers Deleted Successfully'});
 
 }
 
  });
 });


module.exports = router;
