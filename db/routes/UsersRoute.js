import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { UserInfo } from '../models/UserInformation.js';

const router = express.Router();


// Register
router.post('/signup', async(request,response)=> {
    try {
        if(
            !request.body.name ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Please fill all fields',
            });
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const newUser = {
            name : request.body.name,
            email : request.body.email,
            password : hashedPassword,
        };
        const user = await User.create(newUser);
        const newUserInfo = {
            userId : user._id,
            name: "",
            profileBanner: "",
            profilePicture: "",
            bio: "",
            location: "",
            website: "",
            dob: ""
        };
        await UserInfo.create(newUserInfo);
        return response.status(201).send(user);
        
    } catch (error) {
        console.warn(error.message);
        response.status(500).send({message: error.message})
    }
})

// Login
router.post('/login', async(request,response)=> {
    try {
        if(
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Please fill all fields',
            });
        }
        const { email, password } = request.body;
        try {
            const user = await User.findOne({email});
            if(!user) {
                return response.status(401).json({ message: 'Invalid email or password' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return response.status(201).send(user);
              }
              else {
                return response.status(401).json({ message: 'Invalid email or password' });
              }
            
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Server error' });
        }
        const user = await User.create(newUser)
        return response.status(201).send(user);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Upload
// router.post('/upload', async(request,response)=> {
//     try {
//         const userInfo =  await UserInfo.create({profileBanner: request.file.filename})
//         console.warn(request.file);
//         response.status(201).json(UserInfo);
        
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message})
//     }
// })

router.patch('/upload/:userId', async (request,response) => {
    try {
        const userId = request.params.userId;
        const userInfo =  await UserInfo.findOneAndUpdate({ userId: userId } , {profilePicture: profilePicture[0].path, profileBanner: bannerImage[0].path }, { new: true })
        console.warn(request.file);
        response.status(201).json(userInfo);
    } catch (error) {
        response.status(500).send("wrong id!");
    }
});


export default router;