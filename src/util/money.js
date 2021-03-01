export const formatMoney = money => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(money);
}

export const getAccountClass = money => {
  return money > 0 ? 'text-success' : 'text-danger'
}

export const getTransactionClass = (money, type) => {
  if (type === 'income') {
    return 'text-success';
  } else if (type === 'transaction') {
    return money > 0 ? 'text-danger' : 'text-success';
  } else if (type === 'expense') {
    return 'text-danger';
  }
}