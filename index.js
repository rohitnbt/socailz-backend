import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import { PORT } from './config.js';
import UserRoute from './db/routes/UsersRoute.js'
import bodyParser from 'body-parser';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), UserRoute);

mongoose.connect('mongodb://localhost:27017/Socialz')
.then(() => {
    console.log('Database is connected')
})


app.listen(PORT, ()=> {
    console.log(`App is running at port ${PORT}`);
})