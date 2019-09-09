import React from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

class NewTransaction extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
      },
      errors: {}
    }
  }



  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/transactions', this.state.formData )
      .then(() => {
        this.props.history.push('/transactions')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }




  render() {
    console.log(this.state.formData)
    return (
      <section className="section-new-page">

        <div className="newtransactionbox">
          <form onSubmit={this.handleSubmit}>


            <button className="button is-danger">Submit</button>
            <hr />
          </form>
        </div>


      </section>
    )
  }



}

export default NewTransaction
