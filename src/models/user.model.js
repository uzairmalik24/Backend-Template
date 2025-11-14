import mongoose from "mongoose";
import { comparePassword, generateApiResponse, generateToken, hashPassword, verifyToken } from "../services/utils.service.js";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String
}, { timestamps: true });

userSchema.methods.generateToken = function () {
    return generateToken({ _id: this._id, email: this.email, name: this.name });
}

userSchema.methods.verifyToken = function (token) {
    return verifyToken(token);
}

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await hashPassword(this.password);
})

userSchema.methods.hashPassword = async function (password) {
    return await hashPassword(password);
}

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.password);
}

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);