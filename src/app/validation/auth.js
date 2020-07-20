import Joi from 'joi';

exports.register = Joi.object({
  email: Joi.string().email({
    minDomainAtoms: 2
  }).required(),
  decimalData: Joi.string().required(),
  password: Joi.string().required(),
  mobile_number: Joi.string().required()
})

exports.login = Joi.object({
  email: Joi.string().email({
    minDomainAtoms: 2
  }).required(),
  password: Joi.string().required(),
})