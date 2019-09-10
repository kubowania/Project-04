import React from 'react'


const Card = ({reference, amount, currency, description, transaction_timestamp, counterparty}) => {



  return (
    <div className="card">
      <h4 className="content text reference" >{reference}</h4>
      <h4 className="content text counterparty">{counterparty}</h4>
      <h4 className="content text description">{description}</h4>
      <h4 className="content text timestamp">{transaction_timestamp}</h4>
      <h4 className="content text amount">{amount} {currency}</h4>
      <div className="buttonsdiv">
        <a className="button is-danger homebutton tooltip" data-tooltip="Delete transaction" >X</a>
        <a className="button is-warning homebutton tooltip" data-tooltip="Edit transaction">0</a>
      </div>
    </div>
  )
}

export default Card
