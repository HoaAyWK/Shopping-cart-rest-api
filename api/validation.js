var Joi = require('joi');

module.exports.validation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
};