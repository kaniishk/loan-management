const {User} = require('../models')

module.exports = {
    async viewCustomers (req,res) {
        try{
          const users = await User.findAll({
              where : {
                  accType : 'Customer'
              }
          })
          res.status(200).send(users)
        }catch (err){
            res.status(500).send({
                msg: err.message,
                error: "An error has occured"
            })
        }
    }
}
