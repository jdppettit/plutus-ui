const R = require('ramda');
const moment = require('moment');

export const normalize = (iterable) => {
  let normalized_iterable = []
  iterable.forEach(i => {
    let settled = R.path(['settled'], i) === undefined ? R.path(['pending'], i) : R.path(['settled'], i)
    normalized_iterable.push({
      date: R.path(['anticipated_date'], i) || R.path(['date'], i),
      amount: i.amount || 0.00,
      description: i.description || "Unknown",
      type: R.path(['type'], i) || 'transaction',
      settled: settled
    })
  })
  console.log(normalized_iterable);
  return normalized_iterable;
}

export const calculateBalance = (iterable, balance) => {
  let current = moment().clone().startOf('month');
  console.log(current);
  iterable.forEach(i => {
    if (moment(i.date).isSameOrAfter(current) 
        && (i.settled === "false" || i.settled === null || i.settled === undefined) 
        && ['transaction', 'expense'].includes(i.type)
    ) {
      balance -= i.amount
    }
    
    if (i.type === 'income') {
      return balance;
    }
  })
  return balance
}