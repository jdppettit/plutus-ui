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
    '/api/v1/account/publictoken',
    request => [
      200, 
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        message: "public token set"
      })
    ]
  )
}