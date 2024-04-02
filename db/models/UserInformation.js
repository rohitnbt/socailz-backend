import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userInformationSchema = mongoose.Schema({
    userId : {
        type: Schema.Types.ObjectId,
    ref: 'User' // Reference to the User collection
  },
    name: 
    {    type: String, 
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
    bio: {
        type: String,
        require: true, 
    },
    location: {
        type: String,
        require: true, 
    },
    website: {
        type: String,
        require: true, 
    },
    dob: {
        type: String,
        require: true, 
    },
}
)

export const UserInfo = mongoose.model("usersInfo", userInformationSchema);