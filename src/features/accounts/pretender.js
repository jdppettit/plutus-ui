export default function() {
  this.get(
    '/api/v1/account/linktoken',
    request => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        linkToken: "absdgaeiwajoifjawewe"
      })
    ]
  )

  this.post(
    '/api/v1/account',
    request => [
      200, 
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        message: "public token set"
      })
    ]
  )

  this.get(
    '/api/v1/account',
    request => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        accounts: [
          {
            description: "Account 1",
            balance: 20.02
          },
          {
            description: "Account 2",
            balance: 10000.50
          },
          {
            description: "Account 3",
            balance: 1200.32
          }
        ]
      })
    ]
  )
}