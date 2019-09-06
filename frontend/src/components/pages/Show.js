import React from 'react'
import Card from '../transactions/Card'
import axios from 'axios'
import Comment from '../common/Comment'
import PartialLoadingIndicatorStory from '../transactions/PartialLoadingIndicatorStory'
import { Link } from 'react-router-dom'
import 'bulma'

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
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleDeleteCounterparty = this.handleDeleteCounterparty.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/counterparties/${this.props.match.params.id}`)
      .then(res => this.setState({ counterparty: res.data }))
    axios.get('/api/transactions/')
      .then(res => this.setState({ transactions: res.data }))
  }


  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({formData})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/counterparties/${this.props.match.params.id}/comments`, this.state.formData )
      .then(res => this.setState({counterparty: res.data, formData: {content: ''}}))
  }

  handleDeleteComment(e) {
    e.preventDefault()

    axios.delete(`/api/counterparties/${this.props.match.params.id}/comments/${e.target.id}`)
      .then(res => this.setState({counterparty: res.data}))
  }

  handleDeleteCounterparty(e) {
    e.preventDefault()

    axios.delete(`/api/counterparties/${this.props.match.params.id}`)
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
    console.log(this.state)
    if(!this.state.counterparty) return null
    console.log(this.getCounterpartyTotalAmount())
    console.log(this.getCounterpartyPercentage())
    // console.log(this.state.transactions.length)
    return(
      <section className="section">
        <section className="columns is-desktop counterpartydetails is-dark">
          <div className="column is-auto">
            <PartialLoadingIndicatorStory percentage={this.getCounterpartyPercentage()}/>
          </div>
          <div className="column is-two-thirds companyinfo">
            <div className="titleblock">
              <h1 className="title is-3">{this.state.counterparty.companyname}</h1>
              <div>
                <div className="button editshow">Edit</div>
                <div className="button">Delete</div>
              </div>
            </div>
            <div className="counterpartyinfo">
              <h2 className="showinfo">
              </h2>
              <h2 className="showinfo">{this.state.counterparty.companyregistration}</h2>
              <h2 className="showinfo">Current revenue statement:  {this.getCounterpartyTotalAmount()} GBP</h2>
            </div>
            <div className="addresssection">
              <h2> Address from Companies House</h2>
            </div>
          </div>

        </section>

        <hr/>

        <div className="columns is-desktop showsections">
          <div className="column is-auto">
            <div className="showsection">1
            </div>
            <div className="showsection">2
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
