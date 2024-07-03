import Joi from "joi";

export const authSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  subscription: Joi.alternatives().try(
    Joi.string().valid("starter"),
    Joi.string().valid("pro"),
    Joi.string().valid("business")
  ),
});

export const authSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});

export const authVerifySchema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});
