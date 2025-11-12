export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.code === 11000) {
        console.log('====== / Duplicate key error / ======');
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            isSuccess: false,
            status: 400,
            message: `${field} already exists`
        });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            isSuccess: false,
            status: 400,
            message: messages.join(', ')
        });
    }

    return res.status(err.status || 500).json({
        isSuccess: false,
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    });
};
