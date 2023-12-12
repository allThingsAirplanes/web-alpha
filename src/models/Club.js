import mongoose from "mongoose";

//Schema is the shape of the data for a particular collection in MongoDB - there are different levels of organizations:
//There are databases, and then there are collections within databases. (We could have multiple databses each independent to each other)
//A schema is just for one collection inside a database

const commentSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
}
)
//This is how to make a subdocument(in our case, this is for the comments)
//In a relational database(like SQL), you would have to create a table and everything,
//but with Mongo, it is very simple and straightforwards. 

const postSchema = new mongoose.Schema ({
    content: {
        type: mongoose.Schema.Types.String
    },
    media_url: {
        type: mongoose.Schema.Types.String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.String
    },
    tags: [
        {
            type: mongoose.Schema.Types.String
        }
    ],
    comments: [
        commentSchema
    ]
}, {
    timestamps: true
})

const clubSchema = new mongoose.Schema({
    slug: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
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
    },
    posts: [
        postSchema
    ]
}, {
    timestamps: true
})
export default mongoose.models.Club ?? mongoose.model("Club", clubSchema)
//This is saying that if we were to have a model in the catch, then we are going to use the catch model. Otherwise, we will use this newly created user model. 