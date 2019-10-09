var mongoose=require("mongoose");
const UserSchema={
  name:{type:String,require:true},  
   college:{type:String,require:true},
   phone:{type:Number,require:true}, 
   email:{type:String,require:true}, 
   password:{type:String,require:true}

}
module.exports=mongoose.model('User',UserSchema);
