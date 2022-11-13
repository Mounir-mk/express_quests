const Joi = require("joi");
const validateMovie = (req, res, next) => {
    // validate req.body then call next() if everything is ok
    const { title, director, year, color, duration } = req.body;
    const movieSchema = Joi.object({
        title: Joi.string().max(255).required(),
        director: Joi.string().max(255).required(),
        year: Joi.string().max(255).required(),
        color: Joi.string().max(255).required(),
        duration: Joi.number().integer().min(1).max(999).required(),
    });
    const { error } = movieSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};

const validateUser = (req, res, next) => {
    // validate req.body then call next() if everything is ok
    const { firstname, lastname, email, city, language } = req.body;
    const userSchema = Joi.object({
        email: Joi.string().email().max(255).required(),
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        city: Joi.string().max(255).required(),
        language: Joi.string().max(255).required(),
    });
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};

module.exports = {
    validateMovie,
    validateUser,
};