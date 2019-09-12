import React from 'react'
import { Link , withRouter} from 'react-router-dom'
import Auth from '../../lib/Auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      tabSelected: false
    }
    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
    toast.warning('You have logged out!')
  }



  componentDidUpdate() {
  }

  render() {

    const activeClass = (route) => {
      return this.props.location.pathname === route ? 'is-active' : null
    }

    return (
      <section className="hero is-light">
        <div className="hero-body mainhero">
          <h1 className="logo">Revenoo</h1>

        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed ">
            <div className="container">
              <ul>
                <li className={activeClass('/')}><Link to ="/">Home</Link></li>
                <li className={activeClass('/dashboard')}>{Auth.isAuthenticated() && <Link to ="/dashboard">Dashboard</Link>}</li>
                <li className={activeClass('/counterparties')}>{Auth.isAuthenticated() && <Link to ="/counterparties">Your Customers</Link>}</li>
                <li className={activeClass('/register')}>{!Auth.isAuthenticated() && <Link to ="/register">Register</Link>}</li>
                {Auth.isAuthenticated() && <a onClick={this.logout} className="navbar-item ">Logout</a>}
              </ul>
            </div>
          </nav>
        </div>
      </section>

    )
  }

}

export default withRouter(Navbar)
