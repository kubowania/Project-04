import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route , Switch} from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './components/pages/Home'
import Register from './components/auth/Register'
import DebtorsList from './components/pages/DebtorsList'
import CounterpartyShow from './components/pages/Show'
import ShowTransaction from './components/pages/ShowTransaction'
import Dashboard from './components/pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import './style.scss'


class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar/>
        <ToastContainer
          position="top-center"
        />
        <Switch>
          <Route path= "/counterparties/:id" component={CounterpartyShow}/>
          <Route path= "/dashboard/:id" component={ShowTransaction}/>
          <Route path= "/counterparties" component={DebtorsList}/>
          <Route path= "/dashboard" component={Dashboard}/>
          <Route path= "/register" component={Register}/>
          <Route path= "/" component={Home}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
