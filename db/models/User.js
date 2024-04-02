import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profileBanner: {
        type: String,
        require: true, 
    },
    profilePicture: {
        type: String,
        require: true, 
    },
}
)

export const User = mongoose.model("users", userSchema);