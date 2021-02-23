const {Loan} = require('../models')

module.exports = {
    async applyLoan (req,res) {
        try{
          const loan = new Loan({
              applicant: req.body.applicant,
              appliedFor: req.body.appliedFor,
              amount: req.body.amount,
              interest: req.body.interest,
              duration: req.body.duration,
              startDate: req.body.startDate,
              emi: req.body.emi,
              total_int: req.body.total_int,
              status: 'New'
              })
          
          const newLoan = await loan.save()
          res.status(201).send({
              loan: newLoan.toJSON()
          })
        }catch (err) {
            console.log(err)
            res.status(500).send({
                msg: err.message,
                error: "An error has occured. Try again"
            })
        }
    },
    async viewNewLoans (req,res) {
        try{
            const newloans = await Loan.findAll({
                where: {
                    status: 'New'
                }
            })
            res.status(200).send(newloans)
          }catch (err){
              res.status(500).send({
                  msg: err.message,
                  error: "An error has occured"
              })
          }
    },
    async viewAllLoans (req,res) {
        try{
            const allLoans = await Loan.findAll({})
            res.status(200).send(allLoans)
          }catch (err){
              res.status(500).send({
                  msg: err.message,
                  error: "An error has occured"
              })
          }
    },
    async viewMyLoans (req,res)  {
        try{
            const myloans = await Loan.findAll({
                where: {
                    appliedFor: req.params.username
                }
            })
            res.status(200).send(myloans)
            } catch (err){
              res.status(500).send({
                  msg: err.message,
                  error: "An error has occured"
              })
            }
    },
    async loanDetails (req,res)  {
        try{
            const loan = await Loan.findOne({
                where: {
                    id: req.params.loanId,
                    status: 'New'
                }
            })
            res.status(200).send(loan)
          }catch (err){
              res.status(500).send({
                  msg: err.message,
                  error: "An error has occured"
              })
          }
    },
    async editLoan (req,res) {
        try{
          const loan = await Loan.findOne({
              where: {
                id: req.body.id
              }
          }) 
          if (loan) {
              await Loan.update(req.body, {
                  where: {
                      id: req.body.id
                  }
              })
          } else {
            console.log(err)
            res.status(404).send({
                msg: err.message,
                error: "No record found"
            })
          }
          res.status(201).send({
              loan: loan.toJSON()
          })
        }catch (err) {
            console.log(err)
            res.status(500).send({
                msg: err.message,
                error: "An error has occured. Try again"
            })
        }
    },
    async deleteLoan (req,res) {
        try{
            
          const loan = await Loan.findOne({
              where: {
                id: req.body.id,
                applicant : req.body.applicant,
                status : req.body.status
              }
          }) 
          if (loan) {
              await loan.destroy()
              res.status(201).send({
                message: 'Loan Deleted'
              })
          } else {
            res.status(404).send({
                error: "No record found matching the details"
            })
          }
          
        } catch (err) {
            console.log(err)
            res.status(500).send({
                msg: err.message,
                error: "An error has occured. Try again"
            })
        }
    },

    async approveLoan (req,res) {
        try{
          const loan = await Loan.findOne({
              where: {
                id: req.params.loanId,
                status: 'New'
              }
          }) 
          if (loan) {
              await Loan.update({status:'Approved'}, {
                  where: {
                      id: req.params.loanId
                  }
              })
          } else {
            console.log(err)
            res.status(404).send({
                msg: err.message,
                error: "No record found"
            })
          }
          res.status(201).send({ message: 'Loan Approved' })
        }catch (err) {
            console.log(err)
            res.status(500).send({
                msg: err.message,
                error: "An error has occured. Try again"
            })
        }
    },
    async rejectLoan (req,res) {
        try{
          const loan = await Loan.findOne({
              where: {
                id: req.params.loanId,
                status: 'New'
              }
          }) 
          if (loan) {
              await Loan.update({status:'Rejected'}, {
                  where: {
                      id: req.params.loanId
                  }
              })
          } else {
            console.log(err)
            res.status(404).send({
                msg: err.message,
                error: "No record found"
            })
          }
          res.status(201).send({ message: 'Loan Rejected' })
        }catch (err) {
            console.log(err)
            res.status(500).send({
                msg: err.message,
                error: "An error has occured. Try again"
            })
        }
    },
    
}
