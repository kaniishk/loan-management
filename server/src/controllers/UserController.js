const {User} = require('../models')

module.exports = {
    async viewUsers (req,res) {
        try{
          const users = await User.findAll()
          res.status(200).send(users)
        }catch (err){
            res.status(500).send({
                msg: err.message,
                error: "An error has occured"
            })
        }
    },
    async userDetails (req,res)  {
        try{
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })
            if(user) {
             res.status(200).send(user)
            } else {
             res.status(404).send({
                 error: 'No record found'
             })
            }
          } catch (err) {
              res.status(500).send({
                  msg: err.message,
                  error: "An error has occured"
              })
          }
    },
}
