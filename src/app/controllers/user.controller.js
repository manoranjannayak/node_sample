import User from '../class/user';

exports.register = async (req, res) => {
    try {
        var data = new User(req.body);
        data.register((success_data) => {
            res.status(success_data.code).send(success_data);
        }, (error_data) => {
            res.status(error_data.code).send(error_data);
        })
    } catch (err) {
        res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
    }
}

exports.login = async (req, res) => {
    try {
        var user = new User(req.body);
        user.login((success_data) => {
            res.status(success_data.code).send(success_data);
        }, (error_data) => {
            res.status(error_data.code).send(error_data);
        });
    } catch (err) {
        res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
    }
}
