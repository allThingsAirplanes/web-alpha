import mongoose from "mongoose";

//Schema is the shape of the data for a particular collection in MongoDB - there are different levels of organizations:
//There are databases, and then there are collections within databases. (We could have multiple databses each independent to each other)
//A schema is just for one collection inside a database

const userSchema = new mongoose.Schema ({
    username: {
        type: mongoose.Schema.Types.String,
        unique: true, 
    },
    picture: {
        type: mongoose.Schema.Types.String,
    },
    password: {
        type: mongoose.Schema.Types.String,
    }
})
export default mongoose.models.User ?? mongoose.model ("User", userSchema)
//This is saying that if we were to have a model in the catch, then we are going to use the catch model. Otherwise, we will use this newly created user model. 