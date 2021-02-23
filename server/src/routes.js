const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const AdminController = require('./controllers/AdminController')
const AgentController = require('./controllers/AgentController')
const LoanController = require('./controllers/LoanController')
const UserController = require('./controllers/UserController')

module.exports = (app) => {
    //create Admin account
    app.get('/createAdmin',
        AdminController.createAdmin)
    
    //Register New User
    app.post('/register', 
        AuthControllerPolicy.register,
        AuthController.register)
    
    //Login User
    app.post('/login', 
        AuthController.login)
    
    app.get('/userDetails/:userId',
        UserController.userDetails)

    //View Agents
    app.get('/viewAgents',
        AdminController.viewAgents)

    //View Customers
    app.get('/viewCustomers',
        AgentController.viewCustomers)

    //applyLoan
    app.post('/applyLoan',
        LoanController.applyLoan)

    app.get('/viewNewLoans',
        LoanController.viewNewLoans)
    
    app.get('/viewAllLoans',
        LoanController.viewAllLoans)

    app.get('/viewMyLoans/:username',
        LoanController.viewMyLoans)

    app.get('/loanDetails/:loanId',
        LoanController.loanDetails)
    
    app.put('/editLoan',
        LoanController.editLoan)
    
    app.post('/deleteLoan',
        LoanController.deleteLoan)
    
    app.put('/approveLoan/:loanId',
        LoanController.approveLoan)
    
    app.put('/rejectLoan/:loanId',
        LoanController.rejectLoan)


    
}
