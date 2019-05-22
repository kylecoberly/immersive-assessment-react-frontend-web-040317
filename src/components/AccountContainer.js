import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'

class AccountContainer extends Component {
    state = {
        transactions: [],
        searchTerm: ""
    }

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    filteredTransactions = () => {
        return this.state.transactions.filter(transaction => {
            return transaction.description
                .toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())
        })
    }

    async componentDidMount() {
        const url = "https://boiling-brook-94902.herokuapp.com/transactions"
        const response = await fetch(url)
        const transactions = await response.json()
        this.setState({
            transactions
        })
    }
    render() {
        return (
            <div>
                <Search handleChange={this.handleChange} />
                <TransactionsList transactions={this.filteredTransactions()} />
            </div>
        )
    }
}

export default AccountContainer
