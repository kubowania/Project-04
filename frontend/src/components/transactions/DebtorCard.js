import React from 'react'

const DebtorCard = ({ companyname, companyregistration, image, sicCodes}) => {
  return (
    <div className="card">
      <div className="img-holder">
        <h2 className="content text">{companyname}</h2>
      </div>
      <div className="descriptionandtime">
        <h2 className="content text">{companyregistration}</h2>
        <h2 className="content text">{image}</h2>
      </div>
      <div className="amountandbalance">
        <h2 className="content text">{sicCodes}</h2>
      </div>
    </div>
  )
}

export default DebtorCard
