const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')

function jwtSignUser (user) {
    const THREE_DAYS = 60 * 60 * 24 * 3
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: THREE_DAYS
    })
}

module.exports = {
    async register (req,res) {
        try{
          const user = new User({
              username: req.body.username,
              name: req.body.name,
              accType: req.body.accType,
              password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8))
              })
          
          const newUser = await user.save()
          res.status(201).send({
              user: newUser.toJSON(),
              token: jwtSignUser(newUser.toJSON())
          })
        }catch (err){
            console.log(err)
            res.status(400).send({
                msg: err.message,
                error: "Username already exists or invalid registration"
            })
        }
    },

    async login (req,res) {
        try{
          const {username,password} = req.body
          const user = await User.findOne({
              where: {
                  username: username
              }
          })
          if (!user) {
            return res.status(403).send({
                error: "Invalid User Credentials"
            })
          }
          try{
            const isPasswordValid = await bcrypt.compareSync(password,user.password, function(err,result) {
                if(err) console.log(err)
                else console.log(result)
            })
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: "Invalid Password"
                })
              } 
          }catch(err){
            console.log(err)
          }
        
          const userOb = user.toJSON()
          res.status(200).send({
              user: userOb,
              token: jwtSignUser(userOb)
          })
        }catch (err){
            res.status(500).send({
                error: "An error has occured"
            })
        }
    }

}
