// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expenseAmount, balanceAmount} = props

  return (
    <div className="money-details-container">
      <div className="balance-container">
        <img
          className="money-details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="balance-text-container">
          <p className="name">Your Balance</p>
          <p className="income" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-container">
        <img
          className="money-details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="income-text-container">
          <p className="name">Your Income</p>
          <p className="income" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expense-container">
        <img
          className="money-details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="expenses-text-container">
          <p className="name">Your Expenses</p>
          <p className="income" data-testid="expensesAmount">
            Rs {expenseAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
