import mongoose from "mongoose";

//Schema is the shape of the data for a particular collection in MongoDB - there are different levels of organizations:
//There are databases, and then there are collections within databases. (We could have multiple databses each independent to each other)
//A schema is just for one collection inside a database

const suggestionSchema = new mongoose.Schema({
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
    title: {
        type: mongoose.Schema.Types.String
    },
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
    suggestions: [
        suggestionSchema
    ]
}, {
    timestamps: true
})

const collaboratorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    role: {
        type: mongoose.Schema.Types.String
    },
    invite_status: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
}) 

const projectSchema = new mongoose.Schema({
    //A slug is a string that identifies a piece of content in a human readable way
    //Imagine a project called hobbiest airplane builder. This project, when we create it in the database,
    //will have an unique idea. However, the unique id is not human redable. 
    //As we want a better UI and search engine experience, by inclduing slugs in our URLs. 
    
    slug: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        unique: true
        //make sure to reconsider whether unique is the best option.  
    },
    project_picture: {
        type: mongoose.Schema.Types.String
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    category: {
        type: mongoose.Schema.Types.String
    },
    collaborators: [
        collaboratorSchema
    ],
    project_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    posts: [
        postSchema
    ]
}, {
    timestamps: true
})
export default mongoose.models.Project ?? mongoose.model("Project", projectSchema)
//This is saying that if we were to have a model in the catch, then we are going to use the catch model. Otherwise, we will use this newly created user model. 