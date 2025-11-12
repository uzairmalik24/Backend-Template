import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { paramIdChecker, requiredValidators } from '../middlewares/routeValidators.js';
import { User } from '../startup/models.js';

const router = express.Router();

router.get(
    '/',
    userController.getAllUsers
)


router.get(
    '/:id',
    paramIdChecker(User),
    userController.getUserById
)

router.post(
    '/',
    requiredValidators(['name', 'email', 'password']),
    userController.createUser
)

router.patch(
    '/',
    requiredValidators(['_id', 'name', 'email', 'password']),
    userController.updateUser
)

router.delete(
    '/:id',
    paramIdChecker(User),
    userController.deleteUser
)

export default router