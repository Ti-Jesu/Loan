const mongoose = require ('mongoose');


const paymentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber:String,
    dob: String,
});
const paymentModel= mongoose.model('payments', paymentSchema);
module.exports=paymentModel;