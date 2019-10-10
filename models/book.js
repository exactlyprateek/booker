var mongoose=require("mongoose");
const BookSchema={
  title:{type:String,require:true},  

   seller :  { type:String,require:true
}, 
buyer:  { 
    type:String,
    default:"null"
}, 
price:{type:Number,require:true},
quality:{type:Number,require:true}

}
module.exports=mongoose.model('Book',BookSchema);
