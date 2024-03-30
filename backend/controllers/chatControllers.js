import Chat from "../models/chatModel"

const accessChat = async (req,res) => {
const {userId} = req.body;

if(!userId){
    console.log("userId param does not sent with request");
    return res.sendStatus(400);
}
}