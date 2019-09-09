import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData, error: ''})
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.closeModal()
        this.props.history.push('/burgers')
      })
      .catch(() => {
        Auth.removeToken()
        this.setState({error: 'Wrong credentials'})
      })
  }

  render() {
    return (
      <section className="section login-portal">
        <div className="container">
          <form className="loginform" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="eg: sam@samsplace.com"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="eg: ••••••••"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && <small className="help is-danger">{this.state.error}</small>}
            </div>

            <h2>Not a registered user? Click here to register</h2>

            <button className="button is-danger loginsubmit">Submit</button>
          </form>
        </div>


      </section>
    )
  }
}
export default Home
