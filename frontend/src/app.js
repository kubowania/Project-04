import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { HashRouter, Route , Switch} from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './components/pages/Home'
import DebtorsList from './components/pages/DebtorsList'
import CounterpartyShow from './components/pages/Show'

import './style.scss'


class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar/>
        <Switch>
          <Route path= "/counterparties/:id" component={CounterpartyShow}/>
          <Route path= "/counterparties" component={DebtorsList}/>
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
