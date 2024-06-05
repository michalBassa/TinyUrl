
import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    originalUrl: {
    type: String,
    required: true,
  },
  clicks: [
    {
        insertedAt:Date,
        ipAddress: String,
        targetParamValue:String
    }
],
    targetParamName:{
        type: String,
        default: "t"
    } ,
    targetValues: [
            {
                name: String,
                value:String
            }
        ]
});

export default mongoose.model("link", LinkSchema);
