const mongoose = require('mongoose');

const professionalSchema= new mongoose.Schema(
    {
        p_id:{type:mongoose.Schema.Types.ObjectId, ref:"user" ,required:true},
        resume:{type:String, required: true},
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

module.exports=new mongoose.model("professional", professionalSchema);