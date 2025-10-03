const mongoose = require("mongoose");

const PostSchema =  new mongoose.Schema({
    imageUrl: {
        type: String,require:true
    },
    title: {type:String,require:true},
    description: String,
    likeCount:{type:Number,default:0},
    createBy:String,
},{
    timestamps: true
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
