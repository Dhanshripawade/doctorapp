
exports.success = (res, message, data = null, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};


exports.created = (res, message, data = null, status = 201) => {
    return res.status(status).json({
        success:true,
        message,
        data
    });
};

exports.error = (res,message, error = null, status = 500) => {
    console.error(error);
    return res.status(status).json({
        success:false,
        message,
        error: error ? error.message : null
    });
};

exports.respond = (res, message, data = null, status = null, success = null) => {
    return res.status(status).json({
        success:success,
        message,
        data
    });
};
