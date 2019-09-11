import React from 'react'
import { Link } from 'react-router-dom'


const CounterpartySpecficCard = ({id, reference, amount, currency, description, transaction_timestamp}) => {



  return (
    <div className="card">
      <div className="cardinfo">
        <h4 className="content text reference" >{reference}</h4>
        <h4 className="content text description">{description}</h4>
        <h4 className="content text timestamp">{transaction_timestamp}</h4>
        <h4 className="content text amount">{amount} {currency}</h4>
      </div>
      <div className="buttonsdiv">
        <Link to ={`/dashboard/${id}`}><a className="button is-warning homebutton tooltip" data-tooltip="View transaction">View</a></Link>
      </div>
    </div>
  )
}

export default CounterpartySpecficCard
