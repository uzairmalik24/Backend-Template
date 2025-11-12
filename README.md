# Backend Template (Node.js + Express + Mongoose)

This backend template is designed with **industry-level standards**, focusing on **reusability, maintainability, and robust error handling**. It follows the **MVC architecture** and provides ready-to-use features for building scalable Node.js APIs.

---

## Features

* **MVC Structure**: Clear separation of models, controllers, and routes.
* **Reusable Utilities**: Functions for hashing passwords, generating tokens, verifying tokens, and generating consistent API responses.
* **Strong Error Handling**: Centralized `errorHandler` middleware for all types of errors, including:

  * Duplicate key errors (MongoDB)
  * Validation errors
  * Generic server errors
* **Password Management**:

  * Hashing and comparing passwords securely using bcrypt.
* **Route Validation Middleware**: `routeValidators` to check required fields and validate email.
* **Parameter ID Checker**: `paramIdChecker` middleware ensures valid MongoDB ObjectId and entity existence.
* **Async Handler Wrapper**: `asyncHandler` avoids repetitive try/catch blocks in controllers.
* **Clean Responses**: All API responses follow a consistent structure:

  ```json
  {
      "isSuccess": true | false,
      "status": 200 | 400 | 404 | 500,
      "message": "Descriptive message",
      "data": {}
  }
  ```
* **Health Check Endpoint**: `/health` to monitor server status.

---

## Folder Structure

```
src/
 ├─ controllers/       # Business logic for routes
 ├─ models/            # Mongoose models
 ├─ routes/            # Express routers
 ├─ services/          # Utility functions (hashing, token, API response, etc.)
 ├─ middlewares/       # Async handler, error handler, validators
 ├─ index.js           # App entry point
```

---

## Example Usage

### Creating a User

```js
router.post(
    '/',
    routeValidators(['name', 'email', 'password']),
    userController.createUser
);
```

### Updating a User

```js
router.patch(
    '/',
    routeValidators(['name', 'email', 'password']),
    userController.updateUser
);
```

### Deleting a User

```js
router.delete(
    '/:id',
    paramIdChecker(User),
    userController.deleteUser
);
```

---

## Error Handling Example

Duplicate key error (email already exists):

```json
{
  "isSuccess": false,
  "status": 400,
  "message": "email already exists"
}
```

Validation error:

```json
{
  "isSuccess": false,
  "status": 400,
  "message": "name is required, email is invalid"
}
```

---

## Utilities Provided

* `hashPassword(password)` - Hash a password.
* `comparePassword(password, hash)` - Compare a password with a hash.
* `generateToken(payload)` - JWT generation.
* `verifyToken(token)` - JWT verification.
* `generateApiResponse(res, status, isSuccess, message, data)` - Standard API response.

---

## How It Works

1. **Controllers** handle the business logic.
2. **Models** handle data storage and schema.
3. **Routes** connect endpoints to controllers and apply middleware.
4. **Middlewares** validate requests, check IDs, handle async errors, and catch all errors.

---

This template ensures:

* Clean, readable code.
* DRY principles (Don’t Repeat Yourself).
* Easy extension for new features.
* Proper handling of errors before sending responses.

---

**Author:** Uzair Malik
**Stack:** Node.js, Express.js, MongoDB (Mongoose)
**Status:** Backend template in development, ready for customization.


# .env example

MONGODB_URI=
PORT=3000
JWT_SECRET_KEY=my-secret_key/secured*node\test
DB_NAME=node-test
