//a database is essentially a fancy server that you can connect to - logging in to another computer but the whole computer is a very oragnized harddrive

import mongoose from 'mongoose';
import mongoModels from "@/models"
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connectMongo() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        // warm up mongoose models
        Object.values(mongoModels).forEach((model) => {
            console.log("Initialized MongoDB Model: ", model)
        })
        // connect to mongodb
        cached.promise = mongoose.connect(process.env.MONDGODB_CONNECTION_URI, opts).then((mongoose) => {
            console.log("Connect to MongoDB...")
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
export { connectMongo };
//async means that this will take some time - an async function starts and only later does it finish(does not run from top to bottom - we have to manually tell the code when it is finished)

//Whenever code is not put inside a page, it only runs on the server. And that is important for security, because we do not want people knowing what we are doing connecting to the server as they can change many things. It's good that Next.JS provides this degree of isolation. 
