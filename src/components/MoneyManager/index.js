import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    inputType: transactionTypeOptions[0].optionId,
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onChangeInputType = event => {
    this.setState({inputType: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, inputType} = this.state
    const optionType = transactionTypeOptions.find(
      each => each.optionId === inputType,
    )

    const {displayText} = optionType
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      inputType: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      inputType: transactionTypeOptions[0].optionId,
    }))
  }

  calculateExpense = () => {
    const {transactionList} = this.state
    let expenseAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.inputType === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })
    return expenseAmount
  }

  calculateIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.inputType === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  currentBalance = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let remainingBalance = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.inputType === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
    })
    remainingBalance = incomeAmount - expenseAmount
    return remainingBalance
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => eachTransaction.id === id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  render() {
    const {title, amount, transactionList, inputType} = this.state

    const incomeAmount = this.calculateIncome()
    const expenseAmount = this.calculateExpense()
    const balanceAmount = this.currentBalance()

    return (
      <div className="app-container">
        <div className="money-manager">
          <div className="header">
            <h1 className="heading">Hi,Richard</h1>
            <p className="money-manager-para">
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
            balanceAmount={balanceAmount}
          />
          <div className="transactions-container">
            <form className="form-container" onSubmit={this.onAddTransaction}>
              <h1 className="form-heading">Add Transaction</h1>
              <label htmlFor="title" className="title-heading">
                TITLE
              </label>
              <input
                id="title"
                onChange={this.onChangeTitleInput}
                value={title}
                placeholder="TITLE"
              />

              <label htmlFor="amount" className="amount-heading">
                AMOUNT
              </label>
              <input
                id="amount"
                onChange={this.onChangeAmount}
                value={amount}
                placeholder="AMOUNT"
              />
              <label htmlFor="input-type" className="input-type-container">
                TYPE
              </label>
              <select
                id="input-type"
                value={inputType}
                onChange={this.onChangeInputType}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="money-manager-details-container">
              <h1 className="history">History</h1>
              <div className="history-transaction-container">
                <ul className="transaction-table">
                  <li className="list-items-container">
                    <p className="history-heading">Title</p>
                    <p className="history-heading">Amount</p>
                    <p className="history-heading">Type</p>
                  </li>
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
