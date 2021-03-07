const userService = require('../model/User');

module.exports.get = (req, res, next) => {
    userService.get(req.params.id).then(user => {
        return res.status(200).json({
            status_code: 200,
            user : user,
            error: ''
        })
    }).catch(err => {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    })
};