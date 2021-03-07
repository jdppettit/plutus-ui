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

export const determineSettledStyle = settled => {
  if (settled === false) {
    return { fontStyle: 'italic' }
  } else if (settled === true) {
    return {}
  } else {
    return { fontStyle: 'italic' }
  }
}

export const determineSettledClass = settled => {
  if (settled === false) {
    return 'text-muted'
  } else if (settled === true) {
    return ''
  } else {
    return 'text-muted'
  }
}