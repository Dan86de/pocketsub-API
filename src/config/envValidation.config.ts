import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  DOMAIN: Joi.string(),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_SECRET: Joi.number().required(),
});
