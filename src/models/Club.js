import mongoose from "mongoose";

//Schema is the shape of the data for a particular collection in MongoDB - there are different levels of organizations:
//There are databases, and then there are collections within databases. (We could have multiple databses each independent to each other)
//A schema is just for one collection inside a database

const clubSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        unique: true
        //make sure to reconsider whether unique is the best option.  
    },
    club_picture: {
        type: mongoose.Schema.Types.String
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    type: {
        type: mongoose.Schema.Types.String
    },
    invite_status: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})
export default mongoose.models.Club ?? mongoose.model("Club", clubSchema)
//This is saying that if we were to have a model in the catch, then we are going to use the catch model. Otherwise, we will use this newly created user model. 