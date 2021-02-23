const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      username: Joi.string().required(),
      name: Joi.string().required(),
      accType: Joi.string().valid('Customer','Agent','Admin').required(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ).required()
    })

    const {error} = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'Username is invalid'
          })
          break
        case 'accType':
            res.status(400).send({
                error: 'Please select Valid account Type'
            })
            break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:<br> 1. It must contain ONLY the following characters: lower case, upper case, numerics.<br>2. It must be at least 8-32 characters in length`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}