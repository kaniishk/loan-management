const {User} = require('../models')
const bcrypt = require('bcryptjs')

module.exports = {
    async createAdmin (req,res) {
        try{
            const user = new User({
                username: 'admin',
                name: 'Admin',
                accType: 'Admin',
                password: bcrypt.hashSync('admin',bcrypt.genSaltSync(6))
                })
            
            const newUser = await user.save()
            res.status(201).send({
                user: newUser.toJSON()
            })
          }catch (err){
              console.log(err)
              res.status(400).send({
                  msg: err.message,
                  error: "Username already exists"
              })
        }
    },
    async viewAgents (req,res) {
        try{
          const users = await User.findAll({
              where : {
                  accType : 'Agent'
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
