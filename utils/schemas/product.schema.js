const Joi = require("joi");

const productIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTagSchema = Joi.array().items(Joi.string().max(10));

const MAX_LENGTH_NAME = 50;
const MIN_PRICE = 1;
const MAX_PRICE = 1000000;

const createProductSchema = {
  name: Joi.string().max(MAX_LENGTH_NAME).required(),
  price: Joi.number().min(MIN_PRICE).max(MAX_PRICE),
  image: Joi.string().required(),
  tags: productTagSchema,
};

const updateProductSchema = {
  name: Joi.string().max(MAX_LENGTH_NAME),
  price: Joi.number().min(MIN_PRICE).max(MAX_PRICE),
  image: Joi.string(),
  tags: productTagSchema,
};

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
};
