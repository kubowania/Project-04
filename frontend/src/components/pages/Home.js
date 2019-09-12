import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData, error: ''})
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/dashboard')
      })
      .catch(() => {
        Auth.removeToken()
        this.setState({error: 'Wrong credentials'})
      })
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <section className="columns login-portal homepagebanner">
          <div className="column">
            <div className="container homepageherotext">
              <h1 className="hero-title">Revenoo</h1>
              <h2 className="hero-subtitle">Track your startups revenue and find like-for-like business based on your customers all in one app.</h2>
              <br/>
              <h2 className="hero-subtitle">Sign up and grow with Revenoo today.</h2>
              <br/>
              {!Auth.isAuthenticated() && <Link to ="/register"><button className="button is-warning">Register</button></Link>}
            </div>
          </div>
          <div className="column">
            <div className="container homepagesignin">
              {!Auth.isAuthenticated() && <form className="loginform" onSubmit={this.handleSubmit}>
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

                <h2>Not a registered user? Click <Link to ="/register">here</Link> to register</h2>
                <br/>
                <button className="button is-danger loginsubmit">Log in</button>
              </form>}

              {Auth.isAuthenticated() && <div>
                <h2>Oh no! Are you leaving already?</h2>
                <br/>
                <button onClick={this.logout} className="button is-warning ">Logout</button>
              </div>}

            </div>
          </div>

        </section>

        <div className="footer">
          <div>
            <br/>
            <h2 className="footertext">This is a General Assembly Project</h2>
            <h2 className="footertext">Find the ReadMe to this project <Link to="https://github.com/kubowania/Project-04/blob/master/README.md">here</Link></h2>
            <h2 className="footertext">Find the Github link <Link to="https://github.com/kubowania/Project-04">here</Link></h2>
          </div>

          <div>
            <br/>
            <h2 className="footertext">Made by Ania Kubow | a one week project</h2>
            <h2 className="footertext">Find me on <Link to="https://www.linkedin.com/in/ania-kubow-77766027/">Linkedin</Link></h2>
          </div>

          <div>
            <br/>
            <h2 className="footertext">This project was made primarily with:</h2>
            <h2 className="footertext">Django</h2>
            <h2 className="footertext">React</h2>
          </div>

        </div>
      </div>
    )
  }
}
export default Home
