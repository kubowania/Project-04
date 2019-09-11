import React from 'react'
import 'bulma-tooltip'

const DebtorCard = ({ companyname, companyregistration}) => {
  return (
    <div className="card">
      <h2 className="content text debtorcompany">{companyname}</h2>
      <div className="tooltip" data-tooltip="Companies House Registration">
        <h2 className="content text">{companyregistration}</h2>
      </div>
    </div>
  )
}

export default DebtorCard
