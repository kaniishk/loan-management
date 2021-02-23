module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        applicant: {
            type: DataTypes.STRING,
            required: true
        },
        appliedFor: {
            type: DataTypes.STRING,
            required: true
        }, 
        amount: {
            type: DataTypes.NUMBER,
            required: true
        },
        interest: {
            type: DataTypes.NUMBER,
            required: true
        },
        duration: {
            type: DataTypes.NUMBER,
            required: true
        },
        startDate: {
            type: DataTypes.STRING,
            required: true
        },
        emi: {
            type: DataTypes.NUMBER,
            required: true
        },
        total_int: {
            type: DataTypes.NUMBER,
            required: true
        },
        status: {
            type: DataTypes.STRING,
            required: true
        }  
    })

    return Loan;
}
