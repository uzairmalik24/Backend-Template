import mongoose from "mongoose";
import { asyncHandler } from "../services/asyncHandler.service.js";
import { generateApiResponse } from "../services/utils.service.js";
import { User } from "../startup/models.js";
import { validateAndGetOne } from "../services/mongoFunc.service.js";


export const userController = {


    getAllUsers: asyncHandler(async (req, res) => {
        const users = await User.find()
        return generateApiResponse(res, 200, true, 'Users fetched successfully!', { users })
    }),


    getUserById: asyncHandler(async (req, res) => {
        const user = await validateAndGetOne(User, req.params.id, [], '-password')
        return generateApiResponse(res, 200, true, 'User fetched successfully!', { user })
    }),

    createUser: asyncHandler(async (req, res) => {
        const {
            name,
            email,
            password
        } = req.body

        const user = await User.create({
            name,
            email,
            password
        })

        if (user) {
            return generateApiResponse(res, 201, true, 'User created successfully!', { user })
        }
    }),


    updateUser: asyncHandler(async (req, res) => {

        const {
            _id,
            name,
            email,
            password
        } = req.body

        let user = await User.findById({ _id })

        if (!user) {
            return generateApiResponse(res, 404, false, 'User not found!')
        }
        if (email) {
            user.email = email
        }
        if (password) {
            user.password = await user.hashPassword(password)
        }
        if (name) {
            user.name = name
        }
        user = await user.save()

        if (user) {
            return generateApiResponse(res, 200, true, 'User updated successfully!', { user })
        }
    }),


    deleteUser: asyncHandler(async (req, res) => {
        const user = await validateAndGetOne(User, req.params.id)
        await user.deleteOne()
        return generateApiResponse(res, 200, true, 'User deleted successfully!')
    })
}