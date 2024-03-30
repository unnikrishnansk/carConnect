import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
       chatName: {
        type: String,
        trim: true
       },
       Message: {
        type: String,
        trim: true
       },
       users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

       }]
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;