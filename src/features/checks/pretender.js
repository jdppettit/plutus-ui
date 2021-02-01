export default function() {
  this.get(
    '/api/v1/checks',
    request => [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({'checks': [
        {
          "value": "record.updated_at",
          "updated_at": "2020-05-09T04:17:13",
          "type": "http_json_comparison",
          "target": "http://google.com",
          "state": "nominal",
          "operation": "greater_than_or_equal_to",
          "name": "Zeus-Server Check Date",
          "last_alerted_for": null,
          "interval": 6000,
          "inserted_at": "2020-05-09T03:42:42",
          "id": 10,
          "comparison": "$last_30_minutes",
          "alerts": []
        },
        {
          "value": "record.updated_at",
          "updated_at": "2020-05-09T04:17:13",
          "type": "ping",
          "target": "10.0.0.1",
          "state": "critical",
          "operation": null,
          "name": "Check router",
          "last_alerted_for": null,
          "interval": 6000,
          "inserted_at": "2020-05-09T03:42:42",
          "id": 11,
          "comparison": null,
          "alerts": [
            {
                "updated_at": "2020-05-09T03:18:33",
                "type": "email",
                "target": "joe@example.com",
                "last_sent": "2020-05-09T03:18:33Z",
                "interval": 60000,
                "inserted_at": "2020-05-06T02:19:42",
                "id": 1,
                "check_id": 9
            }
          ]
        },
        {
            "value": "record.value",
            "updated_at": "2020-05-10T02:36:20",
            "type": "http_json",
            "target": "http://facebook.com",
            "state": "nominal",
            "operation": null,
            "name": "Facebook Check",
            "last_alerted_for": "nominal",
            "interval": 6000,
            "inserted_at": "2020-05-03T02:12:55",
            "id": 9,
            "comparison": null,
            "alerts": []
        }
      ]})
    ]
  )
}
