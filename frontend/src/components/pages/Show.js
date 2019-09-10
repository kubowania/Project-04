import React from 'react'
import Card from '../transactions/Card'
import axios from 'axios'
import Comment from '../common/Comment'
import { Promise } from 'bluebird'
import PartialLoadingIndicatorStory from '../transactions/PartialLoadingIndicatorStory'
import { Link } from 'react-router-dom'
import 'bulma'
import 'bulma-tooltip'
import Auth from '../../lib/Auth'
import ShowCounterparty from '../transactions/ShowCounterparty'

import helpers from '../../lib/helpers'


class CounterpartyShow extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        content: ''
      },
      errors: {},
      percentage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitNewTransaction = this.handleSubmitNewTransaction.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleDeleteCounterparty = this.handleDeleteCounterparty.bind(this)
  }


  componentDidMount() {
    Promise.props({
      counterparty: axios.get(`/api/counterparties/${this.props.match.params.id}/`).then(res => res.data),
      transactions: axios.get('/api/transactions/').then(res => res.data)
    })
      .then(data => {
        return axios.get(`/api/companieshouse/${data.counterparty.companyregistration}`)
          .then(response => {
            this.setState({
              counterparty: data.counterparty,
              transactions: data.transactions,
              chresults: response.data
            })
          })
      })
  }



  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({formData})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/counterparties/${this.props.match.params.id}/comments`, this.state.formData )
      .then(res => this.setState({
        counterparty: res.data, formData: { content: '' }
      }))
  }

  handleSubmitNewTransaction(e) {
    e.preventDefault()

    axios.post('/api/transactions/', this.state.formData )
      .then(() => {
        this.props.history.push('/dashboard/')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleDeleteComment(e) {
    e.preventDefault()

    axios.delete(`/api/counterparties/${this.props.match.params.id}/comments/${e.target.id}`)
      .then(res => this.setState({counterparty: res.data}))
  }

  handleDeleteCounterparty(e) {
    e.preventDefault()

    axios.delete(`/api/counterparties/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/counterparties/'))
  }

  getCounterpartyTotalAmount() {
    if(!this.state.counterparty) return 0
    return helpers.normalisePrice(this.state.counterparty.transactions.reduce((total, transaction) => total + transaction.amount, 0))
  }

  getCounterpartyPercentage() {
    if(!this.state.transactions) return 0
    return (this.getCounterpartyTotalAmount())/ (helpers.getGlobalTotalAmount(this.state.transactions)) *100
  }



  render() {
    console.log(this.state.formData)
    //
    if(!this.state.counterparty) return null
    if(!this.state.chresults) return null
    console.log(this.getCounterpartyTotalAmount())
    console.log(this.getCounterpartyPercentage())
    return(
      <section className="section">
        <section className="columns is-desktop counterpartydetails is-dark">

          <div className="column is-auto">
            <div className="tooltip" data-tooltip={`${this.state.counterparty.companyname} makes up ${helpers.normalisePrice(this.getCounterpartyPercentage())}% of your total revenue.`}>
              <PartialLoadingIndicatorStory
                percentage={this.getCounterpartyPercentage()}/>
            </div>
          </div>


          <div className="column is-two-thirds companyinfo">
            <div className="titleblock">
              <h1 className="title is-3">{this.state.counterparty.companyname}</h1>
              <div>
                <ShowCounterparty/>
                <div className="button is-warning editshow">Edit</div>
                <div className="button is-danger showpagebuttondelete tooltip" data-tooltip="WARNING! Deleting this customer will delete ALL their transactions." onClick={this.handleDeleteCounterparty}>Delete</div>
              </div>
            </div>
            <div className="counterpartyinfo">
              <h2 className="showinfo">
              </h2>
            </div>
            <div className="addresssection">

              <div className="tradingstatus">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Current trading status:</td>
                      <td>{this.state.chresults.company_status}</td>
                    </tr>
                    <tr>
                      <td>Companies House registration: </td>
                      <td>{this.state.counterparty.companyregistration}</td>
                    </tr>
                    <tr>
                      <td>Date of incorporation: </td>
                      <td>{this.state.chresults.date_of_creation}</td>
                    </tr>
                    <tr>
                      <td>Registered Address: </td>
                      <td>{this.state.chresults.registered_office_address.address_line_1}<br/> {this.state.chresults.registered_office_address.address_line_2}<br/> {this.state.chresults.registered_office_address.locality} {this.state.chresults.registered_office_address.region} {this.state.chresults.registered_office_address.postal_code}  </td>
                    </tr>
                  </tbody>
                </table>
              </div>


            </div>
          </div>

        </section>

        <hr/>

        <div className="columns is-desktop showsections">
          <div className="column is-auto">
            <div className="showsection">
              <h2 >Current revenue statement: </h2>
              <h1 className="counterpartyrevenue">{this.getCounterpartyTotalAmount()} GBP</h1>
            </div>
            <br/>
            <div className="showsection">

              <div className="newtransactionbox">
                <form onSubmit={this.handleSubmitNewTransaction}>

                  <div className="field">
                    <label className="label">Reference</label>
                    <input
                      className="input"
                      name="reference"
                      placeholder="eg: Invoice45"
                      value={this.state.formData.reference}
                      onChange={this.handleChange}
                    />
                  </div>


                  <div className="field amount-field">
                    <label className="label">Amount</label>
                    <input
                      className="input"
                      type="number"
                      name="amount"
                      placeholder="eg: 1500.00"
                      value={(this.state.formData.amount)}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field currency-field">
                    <label className="label">Currency</label>
                    <input
                      className="input"
                      type="field"
                      name="currency"
                      placeholder="eg: GBP"
                      value={(this.state.formData.currency)}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field description-field">
                    <label className="label">Description</label>
                    <input
                      className="input"
                      type="field"
                      name="description"
                      placeholder="eg: Payment for postage"
                      value={(this.state.formData.description)}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field counterparty-field">
                    <label className="label">Is {this.state.counterparty.companyname} the correct counterparty?</label>
                    <input
                      className="checkbox"
                      type="checkbox"
                      name="counterparty"
                      value= {this.props.match.params.id}
                      onChange={this.handleChange}
                    />
                  </div>


                  <button className="button is-danger">Submit</button>
                </form>
              </div>

            </div>
          </div>
          <div className="column is-two-thirds">
            <Comment/>
            <div className="rowheader">
              <h2>header</h2>
            </div>
            <div className="rows is-multiline">
              {this.state.counterparty.transactions.map(transaction =>
                <div
                  key={transaction._id}
                  className="row is-mobile counterpartyrow"
                >
                  <Link to={`/transactions/${transaction._id}`}>
                    <Card
                      reference ={transaction.reference}
                      amount={helpers.normalisePrice(transaction.amount)}
                      currency={transaction.currency}
                      description={transaction.description}
                      transaction_timestamp={(transaction.transaction_timestamp).substring(0, 10)} />
                  </Link>
                </div>
              )}
            </div>



          </div>
        </div>





      </section>
    )
  }
}
export default CounterpartyShow
