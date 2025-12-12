const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: {type: String, require: true},
    postId: {type:mongoose.Schema.Types.ObjectId, require:true},
    createBy: String
},{
    timestamp: true
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;