import React from 'react'
import axios from 'axios'
import 'bulma'
import 'bulma-tooltip'
import Auth from '../../lib/Auth'

import helpers from '../../lib/helpers'


class ShowTransaction extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }


  componentDidMount() {
    axios.get(`/api/transactions/${this.props.match.params.id}`)
      .then(res => this.setState({ transactions: res.data }))
  }


  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({formData})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/transactions/${this.props.match.params.id}/`, this.state.formData )
      .then(res => this.setState({counterparty: res.data}))
  }


  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/transactions/${this.props.match.params.id}/`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/dashboard/'))
  }



  render() {
    console.log(this.state)
    //
    if(!this.state.transactions) return null
    return(
      <section className="section">
        <div className="container transactionview">
          <h2 className="transactiontitle">Your Transaction in detail</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>Reference</td>
                <td>Counterparty</td>
                <td>Description</td>
                <td>Date</td>
                <td>Amount</td>
              </tr>
              <tr>
                <td>{this.state.transactions.reference}</td>
                <td>{this.state.transactions.counterparty.companyname}</td>
                <td>{this.state.transactions.description}</td>
                <td>{(this.state.transactions.transaction_timestamp).substring(0, 10)}</td>
                <td>{helpers.normalisePrice(this.state.transactions.amount)} {this.state.transactions.currency}</td>
              </tr>
            </tbody>
          </table>
          <button className="button is-danger transactionviewbutton" onClick={this.handleDelete}>Delete this transaction</button>
        </div>



      </section>
    )
  }
}
export default ShowTransaction
