import React from 'react'
import axios from 'axios'
import Comment from '../common/Comment'
import PartialLoadingIndicatorStory from '../transactions/PartialLoadingIndicatorStory'
import { Link } from 'react-router-dom'
import 'bulma'


class CounterpartyShow extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        content: ''
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleDeleteCounterparty = this.handleDeleteCounterparty.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/counterparties/${this.props.match.params.id}`)
      .then(res => this.setState({ counterparty: res.data }))
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

  render() {
    return(
      <section className="section">
        <section className="columns is-desktop counterpartydetails is-dark">
          <div className="column is-auto">
            <PartialLoadingIndicatorStory/>
          </div>
          <div className="column is-two-thirds companyinfo">
            <div className="titleblock">
              <h1 className="title is-3">CounterParty Name</h1>
              <div>
                <div className="button editshow">Edit</div>
                <div className="button">Delete</div>
              </div>
            </div>
            <div className="counterpartyinfo">
              <h2 className="showinfo">Amount total</h2>
              <h2 className="showinfo">Company Reg code</h2>
              <h2 className="showinfo">sic codes</h2>
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
          </div>
        </div>





      </section>
    )
  }
}
export default CounterpartyShow
