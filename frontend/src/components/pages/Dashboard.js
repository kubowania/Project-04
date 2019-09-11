import React from 'react'
import Card from '../transactions/Card'
import PartialLoadingIndicatorStoryHomepage from '../transactions/PartialLoadingIndicatorStoryHomepage'
import axios from 'axios'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import Auth from '../../lib/Auth'

import helpers from '../../lib/helpers'


class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: ''
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.filterTransactions = this.filterTransactions.bind(this)
    this.storeValue = this.storeValue.bind(this)

  }



  componentDidMount() {
    axios.get('api/transactions/',  {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
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
    if(!this.state.transactions) return null
    console.log(Auth.getPayload().username)
    console.log(this.state.transactions[0].amount)
    return (
      <div>
        <div className="homepage-container">

          <section className="columns is-desktop personaldashboard is-dark">
            <div className="column is-auto">
              <PartialLoadingIndicatorStoryHomepage/>
            </div>
            <div className="column is-two-thirds companyinfo">
              <h1 className="title is-3">Welcome back {Auth.getPayload().username}</h1>
              <h2>Your total revenue is {helpers.getGlobalTotalAmount(this.state.transactions)}</h2>
              <h2></h2>
            </div>
          </section>



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

          <div className="rowheaderhompage">
            <h4 className="content text referenceheader">Ref</h4>
            <h4 className="content text counterpartyheader">Counterparty</h4>
            <h4 className="content text descriptionheader">Description</h4>
            <h4 className="content text timestampheader">Date</h4>
            <h4 className="content text amountheader">Amount</h4>
          </div>

          {/* ROWS START */}

          <div className="rows is-multiline">
            {this.filterTransactions().map(transaction =>
              <div
                key={transaction.id}
                className="row is-mobile"
              >
                <Card
                  id = {transaction.id}
                  reference ={transaction.reference}
                  amount={helpers.normalisePrice(transaction.amount)}
                  currency={transaction.currency}
                  description={transaction.description}
                  transaction_timestamp={(transaction.transaction_timestamp).substring(0, 10)}
                  counterparty={transaction.counterparty.companyname}/>
              </div>
            )}
          </div>



        </div>
      </div>
    )
  }
}
export default Dashboard
