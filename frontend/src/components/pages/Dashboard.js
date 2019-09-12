import React from 'react'
import Card from '../transactions/Card'
import axios from 'axios'
import _ from 'lodash'
import Auth from '../../lib/Auth'
import PieChart from 'react-minimal-pie-chart'
import { Promise } from 'bluebird'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    this.getCounterpartyTotalAmountOne = this.getCounterpartyTotalAmountOne.bind(this)
    this.getCounterpartyTotalAmountTwo = this.getCounterpartyTotalAmountTwo.bind(this)
    this.getCounterpartyTotalAmountThree = this.getCounterpartyTotalAmountThree.bind(this)
    this.getCounterpartyTotalAmountFour = this.getCounterpartyTotalAmountFour.bind(this)
    this.getCounterpartyTotalAmountFive = this.getCounterpartyTotalAmountFive.bind(this)
    this.getCounterpartyTotalAmountSix = this.getCounterpartyTotalAmountSix.bind(this)
    this.getCounterpartyTotalAmountSeven = this.getCounterpartyTotalAmountSeven.bind(this)
    this.getCounterpartyTotalAmountEight = this.getCounterpartyTotalAmountEight.bind(this)
    this.getCounterpartyPercentageOne = this.getCounterpartyPercentageOne.bind(this)
    this.getCounterpartyPercentageTwo = this.getCounterpartyPercentageTwo.bind(this)
    this.getCounterpartyPercentageThree = this.getCounterpartyPercentageThree.bind(this)
    this.getCounterpartyPercentageFour = this.getCounterpartyPercentageFour.bind(this)
    this.getCounterpartyPercentageFive = this.getCounterpartyPercentageFive.bind(this)
    this.getCounterpartyPercentageSix = this.getCounterpartyPercentageSix.bind(this)
    this.getCounterpartyPercentageSeven = this.getCounterpartyPercentageSeven.bind(this)
    this.getCounterpartyPercentageEight = this.getCounterpartyPercentageEight.bind(this)
  }



  componentDidMount() {
    Promise.props({
      counterparty: axios.get('/api/counterparties/').then(res => res.data),
      transactions: axios.get('/api/transactions/').then(res => res.data)
    })
      .then(data => {
        return axios.get(`/api/companieshouse/${data.counterparty.companyregistration}` || '')
          .then(response => {
            this.setState({
              counterparty: data.counterparty,
              transactions: data.transactions,
              chresults: response.data
            })
          })
      })
  }

  getCounterpartyTotalAmountOne() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[0].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyTotalAmountTwo() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[1].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }


  getCounterpartyTotalAmountThree() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[2].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyTotalAmountFour() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[3].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyTotalAmountFive() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[4].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }


  getCounterpartyTotalAmountSix() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[5].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyTotalAmountSeven() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[6].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyTotalAmountEight() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty[7].transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyPercentageOne() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountOne())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageTwo() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountTwo())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageThree() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountThree())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageFour() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountFour())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageFive() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountFive())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageSix() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountSix())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageSeven() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountSeven())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }

  getCounterpartyPercentageEight() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmountEight())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
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
    console.log(this.state.counterparty)
    console.log(this.getCounterpartyTotalAmountOne())
    console.log(this.getCounterpartyTotalAmountTwo())
    console.log(this.getCounterpartyTotalAmountThree())
    console.log(this.getCounterpartyTotalAmountFour())
    console.log(this.getCounterpartyTotalAmountFive())
    console.log(this.getCounterpartyTotalAmountSix())
    console.log(this.getCounterpartyTotalAmountSeven())
    console.log(this.getCounterpartyTotalAmountEight())
    return (
      <div>
        <div className="homepage-container">

          <section className="columns is-desktop personaldashboard is-dark">
            <div className="column is-auto">


              <div>
                <PieChart
                  data={[
                    {
                      title: this.state.counterparty[0].companyname,
                      value: this.getCounterpartyPercentageOne(),
                      color: '#77966D'
                    },
                    {
                      title: this.state.counterparty[1].companyname,
                      value: this.getCounterpartyPercentageTwo(),
                      color: '#544343'
                    },
                    {
                      title: this.state.counterparty[2].companyname,
                      value: this.getCounterpartyPercentageThree(),
                      color: '#626D58'
                    },
                    {
                      title: this.state.counterparty[3].companyname,
                      value: this.getCounterpartyPercentageFour(),
                      color: '#297373'
                    },
                    {
                      title: this.state.counterparty[4].companyname,
                      value: this.getCounterpartyPercentageFive(),
                      color: '#E9D758'
                    },
                    {
                      title: this.state.counterparty[5].companyname,
                      value: this.getCounterpartyPercentageSix(),
                      color: '#E38627'
                    },
                    {
                      title: this.state.counterparty[6].companyname,
                      value: this.getCounterpartyPercentageSeven(),
                      color: '#C13C37'
                    },
                    {
                      title: this.state.counterparty[7].companyname,
                      value: this.getCounterpartyPercentageEight(),
                      color: '#6A2135'
                    }
                  ]}



                  reveal={this.state.percentage}
                  lineWidth={20}
                  background="#bfbfbf"
                  lengthAngle={270}
                  rounded
                  animate
                />

              </div>


            </div>
            <div className="column is-two-thirds companyinfohome">
              <div className="infobox">
                <h1 className="title is-3">Welcome back {Auth.getPayload().username}</h1>
                <h2>Your current revenue statement is: </h2>
                <h1 className="counterpartyrevenue"> {helpers.getGlobalTotalAmount(this.state.transactions)} GBP</h1>
                <hr/>
                <h2>Revenoo allows you to keep track of your customers revenue and provides a comprehensive overview of your business finances.</h2>
                <br/>
                <h2>Our service is improved thanks to <Link to="https://www.gov.uk/government/organisations/companies-house">Companies House</Link> API.</h2>
              </div>

              <div className="showsectionhomepage">
                <h2 className="infotitle">Your top performing customers</h2>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Company Name</th>
                      <th>Revenue</th>
                    </tr>
                    <tr>
                      <td>{this.state.counterparty[0].companyname}</td>
                      <td>{this.getCounterpartyTotalAmountOne()}</td>
                    </tr>
                    <tr>
                      <td>{this.state.counterparty[1].companyname}</td>
                      <td>{this.getCounterpartyTotalAmountTwo()}</td>
                    </tr>
                    <tr>
                      <td>{this.state.counterparty[2].companyname}</td>
                      <td>{this.getCounterpartyTotalAmountThree()}</td>
                    </tr>
                    <tr>
                      <td>{this.state.counterparty[3].companyname}</td>
                      <td>{this.getCounterpartyTotalAmountFour()}</td>
                    </tr>
                    <tr>
                      <td>{this.state.counterparty[4].companyname}</td>
                      <td>{this.getCounterpartyTotalAmountFive()}</td>
                    </tr>
                    <tr>
                      <td>{this.state.counterparty[5].companyname}</td>
                      <td>{this.getCounterpartyTotalAmountSix()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


            </div>


          </section>

          <hr/>

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

          <div className="rowheaderuniversal">
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
