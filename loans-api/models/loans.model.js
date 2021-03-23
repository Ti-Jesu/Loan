const mongoose = require ('mongoose');


const loanSchema = mongoose.Schema({
    loanName: String,
    loanType: String,
    loanAmount: Number,
    phoneIssueDate:Date,
    loanStatus: String,
});
const LoanModel= mongoose.model('loans', loanSchema);

module.exports=LoanModel;