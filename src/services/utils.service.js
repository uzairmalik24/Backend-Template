import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET_KEY;

export const generateApiResponse = (res, status, isSuccess, message, data) => {
    res.status(status).json({
        isSuccess,
        status,
        message,
        data
    })
}

export const verifyEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);


export const hashPassword = (password) => {
    try {
        let passwordToSave = password;
        if (typeof password === 'number') {
            passwordToSave = password.toString();
        }
        passwordToSave = String(passwordToSave);
        return bcrypt.hashSync(passwordToSave, salt);
    } catch (error) {
        console.log(error);
        return String(password);
    }
};


export const comparePassword = (password, hash) => {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (error) {
        console.log(error);
    }
}


export const generateToken = (data) => {
    try {
        jwt.sign({
            data: data
        }, secret, { expiresIn: '7d' });
    } catch (error) {
        console.log(error);
    }
}


export const verifyToken = (token) => {
    try {
        jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
    }
}