import React from 'react'
import DebtorCard from '../transactions/DebtorCard'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Auth from '../../lib/Auth'
import CreateNewCounterparty from '../transactions/CreateNewCounterparty.js'


class DebtorsList extends React.Component {
  constructor() {
    super()
    this.state = { counterparties: [] }
  }


  componentDidMount() {
    axios.get('api/counterparties/',  {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ counterparties: res.data}))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ happening: null })
      this.loadHappening(this.props.match.params.id)
    }
  }


  render() {
    return (
      <div>
        <div className="homepage-container">

          <CreateNewCounterparty/>

          <div className='debtorlist'>
            <div className="rowheaderuniversal">
              <h4 className="content text counterpartyheader">Company Name</h4>
            </div>
            <div className="rows is-multiline">
              {this.state.counterparties.map(counterparty =>
                <div
                  key={counterparty.id}
                  className="row is-mobile"
                >
                  <Link to={`/counterparties/${counterparty.id}`}>
                    <DebtorCard
                      companyname={counterparty.companyname}
                      companyregistration={counterparty.companyregistration}
                      image={counterparty.image}/>
                  </Link>
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    )
  }
}
export default DebtorsList
