const mongoose = require('mongoose');

// Define Schemes
const chatSchema = new mongoose.Schema(
  {
		roomCode: {type: String, required: true},
		user: {type: String, required: true},
		msg: {type: String, required: true}
	},{
		timestamps: true
	}
);


chatSchema.statics.create = function (roomCode, user, msg) {
    // this === Model
    const chat = new this({
			roomCode,
			user,
			msg
    });
    
    //return Promise
    return chat.save()
};

chatSchema.statics.create = function (roomCode, user, msg) {
	//return Promise
	this.find({roomCode});
};


module.exports = mongoose.model('Chat', chatSchema);
