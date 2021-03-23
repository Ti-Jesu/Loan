const mongoose = require ('mongoose');


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber:String,
    dob: String,
});
const userModel= mongoose.model('users', userSchema);
module.exports=userModel;