import React from 'react'
import { Link , withRouter} from 'react-router-dom'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      tabSelected: false
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  logout() {
    // Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }


  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {

    const activeClass = (route) => {
      return this.props.location.pathname === route ? 'is-active' : null
    }

    return (
      <section className="hero is-light">
        <div className="hero-body mainhero">
          <h1>Revenoo</h1>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed ">
            <div className="container">
              <ul>
                <li className={activeClass('/')}><Link to ="/">The Terminal</Link></li>
                <li className={activeClass('/dashboard')}><Link to ="/dashboard">Dashboard</Link></li>
                <li className={activeClass('/counterparties')}><Link to ="/counterparties">Your Customers</Link></li>
                <li className={activeClass('/burgers')}><Link to ="/burgers">Industry Breakdown</Link></li>
                <li className={activeClass('/about')}><Link to ="/about">Browse</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </section>

    )
  }

}

export default withRouter(Navbar)
