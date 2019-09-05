import React from 'react'
import DebtorCard from '../transactions/DebtorCard'
import axios from 'axios'
import {Link} from 'react-router-dom'


class DebtorsList extends React.Component {
  constructor() {
    super()
    this.state = { counterparties: [] }
  }


  componentDidMount() {
    axios.get('api/counterparties/')
      .then(res => this.setState({ counterparties: res.data}))
  }


  render() {
    return (
      <div>
        <div className="homepage-container">

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
    )
  }
}
export default DebtorsList
