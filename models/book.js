var mongoose=require("mongoose");
const BookSchema={
  title:{type:String,require:true},  
  bookorg :  { type:mongoose.Schema.Types.ObjectId,
    ref:"Bookorg",
    required:true
}, 
   seller :  { type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
}, 
buyer:  { type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    default:"null"
}, 
price:{type:Number,require:true},
quality:{type:Number,require:true}

}
module.exports=mongoose.model('Book',BookSchema);
