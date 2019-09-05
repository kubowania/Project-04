import React from 'react'
import Card from '../transactions/Card'
import axios from 'axios'
import _ from 'lodash'
import {Link} from 'react-router-dom'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      transactions: []
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.filterTransactions = this.filterTransactions.bind(this)
    this.storeValue = this.storeValue.bind(this)
  }



  componentDidMount() {
    axios.get('api/transactions/')
      .then(res => this.setState({ transactions: res.data}))
  }

  storeValue(e){
    this.setState({ heldWord: e.target.value })
  }


  handleKeyUp(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleChange() {
    this.setState({ sortTerm: this.state.heldWord })
  }

  filterTransactions() {
    const re = new RegExp(this.state.searchTerm, 'i')

    const filterTransactions = _.filter(this.state.transactions, transaction => {
      return re.test(transaction.reference) || re.test(transaction.amount) || re.test(transaction.transaction_timestamp) || re.test(transaction.description)
    })

    return filterTransactions
  }

  render() {
    console.log(this.state)
    if(!this.state) return null
    return (
      <div>
        <div className="homepage-container">

          <div className="tile notification is-dark">

            <form>

              {/* SEARCH */}
              <div className="field">
                <div className="control">
                  <input
                    placeholder="Search by description, reference, date or amount"
                    className="input  is-fullwidth searchbar"
                    onKeyUp={this.handleKeyUp}/>
                </div>
              </div>

            </form>

          </div>

          {/* ROWS START */}

          <div className="rows is-multiline">
            {this.filterTransactions().map(transaction =>
              <div
                key={transaction._id}
                className="row is-mobile"
              >
                <Link to={`/transactions/${transaction._id}`}>
                  <Card
                    reference ={transaction.reference}
                    amount={transaction.amount}
                    currency={transaction.currency}
                    description={transaction.description}
                    transaction_timestamp={transaction.transaction_timestamp}
                    counterparty={transaction.counterparty} />
                </Link>
              </div>
            )}
          </div>



        </div>
      </div>
    )
  }
}
export default Home
