export default function() {
  this.post(
    'api/v1/account/:id/transaction',
    request => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        transactions: [
          {
            description: "Income 1",
            amount: 1000.00
          },
          {
            description: "Income 2",
            balance: 1000.00
          }
        ]
      })
    ]
  )
}