import mongoose from "mongoose";

//Schema is the shape of the data for a particular collection in MongoDB - there are different levels of organizations:
//There are databases, and then there are collections within databases. (We could have multiple databses each independent to each other)
//A schema is just for one collection inside a database

const userInterestSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String
    }
})

const dashboardShortcutsSchema = new mongoose.Schema({
    picture: {
        type: mongoose.Schema.Types.String
    },
    name: {
        type: mongoose.Schema.Types.String
    },
    link: {
        type: mongoose.Schema.Types.String
    }
})

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
    },
    interests: [
        userInterestSchema
    ],
    profile_description: {
        type: mongoose.Schema.Types.String,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    dashboard_shortcuts: [
        dashboardShortcutsSchema
    ]
})
userSchema.index({username: "text"})
export default mongoose.models.User ?? mongoose.model ("User", userSchema)
//This is saying that if we were to have a model in the catch, then we are going to use the catch model. Otherwise, we will use this newly created user model. 