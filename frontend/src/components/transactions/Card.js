import React from 'react'

const Card = ({reference, amount, currency, description, transaction_timestamp, counterparty}) => {
  return (
    <div className="card">
      <h4 className="content text">{reference}</h4>
      <h4 className="content text">{counterparty}</h4>
      <h4 className="title is-6">{description}</h4>
      <h4 className="content text">{transaction_timestamp}</h4>
      <h4 className="content text">{amount} {currency}</h4>
      <h4 className="content text">balance</h4>
      <a className="button is-warning homebutton">0</a>
      <a className="button is-danger homebutton">X</a>
    </div>
  )
}

export default Card
