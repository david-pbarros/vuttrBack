module.exports = function(app) {
    return {
        send: function(resp, errorCode, errorMessage, errorDescription) {
            resp.status(errorCode)
                .json({
                    code: errorCode,
                    message: errorMessage,
                    description: errorDescription
                });
        }
    }
}