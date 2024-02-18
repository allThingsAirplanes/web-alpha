import mongoose from "mongoose";

//Schema is the shape of the data for a particular collection in MongoDB - there are different levels of organizations:
//There are databases, and then there are collections within databases. (We could have multiple databses each independent to each other)
//A schema is just for one collection inside a database

const questionSchema = new mongoose.Schema({
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

const announcementSchema = new mongoose.Schema ({
    title: {
        type: mongoose.Schema.Types.String
    },
    content: {
        type: mongoose.Schema.Types.String
    },
    // media_url: {
    //     type: mongoose.Schema.Types.String
    // },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

//This is how to make a subdocument(in our case, this is for the comments)
//In a relational database(like SQL), you would have to create a table and everything,
//but with Mongo, it is very simple and straightforwards. 

const registrantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    invite_status: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
}) 

const organizerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
}) 

const eventSchema = new mongoose.Schema({
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
    event_banner_picture: {
        type: mongoose.Schema.Types.String
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    registratns: [
        registrantSchema
    ],
    organizers: [
        organizerSchema
    ],
    event_host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date_start: {
        type: mongoose.Schema.Types.Date
    },
    date_end: {
        type: mongoose.Schema.Types.Date
    },
    event_link: {
        type: mongoose.Schema.Types.String
    },
    location: {
        type: mongoose.Schema.Types.String
        //Make sure to make a comment below stating: If only online, type: ONLINE
    },
    category: {
        type: mongoose.Schema.Types.String
    },
    tags: [
        {
            type: mongoose.Schema.Types.String
        }
    ],
    announcements: [
        announcementSchema
    ],
    questions: [
        questionSchema
    ],
    catchphrase: {
        type: mongoose.Schema.Types.String
    }
}, {
    timestamps: true
})
export default mongoose.models.Event ?? mongoose.model("Event", eventSchema)
//This is saying that if we were to have a model in the catch, then we are going to use the catch model. Otherwise, we will use this newly created user model. 