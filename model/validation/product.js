const Joi = require('joi');

const productJoiSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  name: Joi.string().alphanum().required(),
  price: Joi.number().min(2).max(7).required(),
  quantity: Joi.number().min(1).max(1000).required(),
});

module.exports = {
  productJoiSchema,
};