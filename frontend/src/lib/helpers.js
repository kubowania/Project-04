function normalisePrice(amount) {
  const amountResult = parseFloat(amount).toFixed(2)
  return amountResult
}

function getGlobalTotalAmount(transactions) {
  if(!transactions) return 0
  return this.normalisePrice(transactions.reduce((total, transaction) => total + transaction.amount, 0))
}

export default {
  normalisePrice,
  getGlobalTotalAmount
}
