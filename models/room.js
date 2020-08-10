const mongoose = require('mongoose');

// Define Schemes
const roomSchema = new mongoose.Schema(
  {
    itemIdx: { type:Number, required: true},
    roomCode: {type:String, required: true},
    buyer: { type: String, required: true },
    seller: { type: String, required: true }
  }
);

roomSchema.statics.create = function (item, seller, buyer) {
    
    //create Room Code

    const roomCode = item + seller;

    // this === Model
    const room = new this({
        itemIdx: item.num,
        roomCode,
        seller: seller.name,
        buyer: buyer.name
    });
    
    //return Promise
    return room.save()
};

roomSchema.statics.findAll = function () {
    // return promise
    return this.find({});
};

roomSchema.statics.findByroomCode = function (roomCode) {
    // return promise
    return this.find({roomCode});
};


module.exports = mongoose.model('Room', roomSchema);
